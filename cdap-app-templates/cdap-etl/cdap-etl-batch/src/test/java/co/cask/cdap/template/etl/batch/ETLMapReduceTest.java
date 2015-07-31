/*
 * Copyright © 2015 Cask Data, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

package co.cask.cdap.template.etl.batch;

import co.cask.cdap.api.common.Bytes;
import co.cask.cdap.api.data.schema.Schema;
import co.cask.cdap.api.dataset.lib.KeyValueTable;
import co.cask.cdap.api.dataset.lib.TimePartitionedFileSet;
import co.cask.cdap.api.dataset.table.Put;
import co.cask.cdap.api.dataset.table.Row;
import co.cask.cdap.api.dataset.table.Table;
import co.cask.cdap.proto.AdapterConfig;
import co.cask.cdap.proto.Id;
import co.cask.cdap.template.etl.batch.config.ETLBatchConfig;
import co.cask.cdap.template.etl.batch.source.FileBatchSource;
import co.cask.cdap.template.etl.common.ETLStage;
import co.cask.cdap.template.etl.common.Properties;
import co.cask.cdap.template.test.sink.MetaKVTableSink;
import co.cask.cdap.template.test.source.MetaKVTableSource;
import co.cask.cdap.test.AdapterManager;
import co.cask.cdap.test.DataSetManager;
import com.google.common.collect.ImmutableMap;
import com.google.common.collect.Lists;
import org.apache.avro.generic.GenericRecord;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FSDataOutputStream;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.fs.s3native.S3NInMemoryFileSystem;
import org.junit.Assert;
import org.junit.Test;

import java.lang.reflect.Method;
import java.net.URI;
import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * Tests for {@link ETLBatchTemplate}.
 */
public class ETLMapReduceTest extends BaseETLBatchTest {
  @Test
  public void testKVToKV() throws Exception {
    // kv table to kv table pipeline
    ETLStage source = new ETLStage("KVTable", ImmutableMap.of(Properties.BatchReadableWritable.NAME, "table1"));
    ETLStage sink = new ETLStage("KVTable", ImmutableMap.of(Properties.BatchReadableWritable.NAME, "table2"));
    ETLStage transform = new ETLStage("Projection", ImmutableMap.<String, String>of());
    List<ETLStage> transformList = Lists.newArrayList(transform);
    ETLBatchConfig etlConfig = new ETLBatchConfig("* * * * *", source, sink, transformList);
    AdapterConfig adapterConfig = new AdapterConfig("", TEMPLATE_ID.getId(), GSON.toJsonTree(etlConfig));

    Id.Adapter adapterId = Id.Adapter.from(NAMESPACE, "testKVAdapter");
    AdapterManager manager = createAdapter(adapterId, adapterConfig);

    // add some data to the input table
    DataSetManager<KeyValueTable> table1 = getDataset("table1");
    KeyValueTable inputTable = table1.get();
    for (int i = 0; i < 10000; i++) {
      inputTable.write("hello" + i, "world" + i);
    }
    table1.flush();

    manager.start();
    manager.waitForOneRunToFinish(5, TimeUnit.MINUTES);
    manager.stop();

    DataSetManager<KeyValueTable> table2 = getDataset("table2");
    KeyValueTable outputTable = table2.get();
    for (int i = 0; i < 10000; i++) {
      Assert.assertEquals("world" + i, Bytes.toString(outputTable.read("hello" + i)));
    }
  }

  @Test
  public void testKVToKVMeta() throws Exception {
    ETLStage source = new ETLStage("MetaKVTable", ImmutableMap.of(Properties.BatchReadableWritable.NAME, "mtable1"));
    ETLStage sink = new ETLStage("MetaKVTable", ImmutableMap.of(Properties.BatchReadableWritable.NAME, "mtable2"));
    ETLBatchConfig etlConfig = new ETLBatchConfig("* * * * *", source, sink);
    AdapterConfig adapterConfig = new AdapterConfig("", TEMPLATE_ID.getId(), GSON.toJsonTree(etlConfig));

    Id.Adapter adapterId = Id.Adapter.from(NAMESPACE, "testMetaKVAdapter");
    AdapterManager manager = createAdapter(adapterId, adapterConfig);

    manager.start();
    manager.waitForOneRunToFinish(5, TimeUnit.MINUTES);
    manager.stop();

    DataSetManager<KeyValueTable> sourceMetaTable = getDataset(MetaKVTableSource.META_TABLE);
    KeyValueTable sourceTable = sourceMetaTable.get();
    Assert.assertEquals(MetaKVTableSource.PREPARE_RUN_KEY,
                        Bytes.toString(sourceTable.read(MetaKVTableSource.PREPARE_RUN_KEY)));
    Assert.assertEquals(MetaKVTableSource.FINISH_RUN_KEY,
                        Bytes.toString(sourceTable.read(MetaKVTableSource.FINISH_RUN_KEY)));

    DataSetManager<KeyValueTable> sinkMetaTable = getDataset(MetaKVTableSink.META_TABLE);
    KeyValueTable sinkTable = sinkMetaTable.get();
    Assert.assertEquals(MetaKVTableSink.PREPARE_RUN_KEY,
                        Bytes.toString(sinkTable.read(MetaKVTableSink.PREPARE_RUN_KEY)));
    Assert.assertEquals(MetaKVTableSink.FINISH_RUN_KEY,
                        Bytes.toString(sinkTable.read(MetaKVTableSink.FINISH_RUN_KEY)));
  }

  @SuppressWarnings("ConstantConditions")
  @Test
  public void testTableToTable() throws Exception {

    Schema schema = Schema.recordOf(
      "purchase",
      Schema.Field.of("rowkey", Schema.of(Schema.Type.STRING)),
      Schema.Field.of("user", Schema.of(Schema.Type.STRING)),
      Schema.Field.of("count", Schema.of(Schema.Type.INT)),
      Schema.Field.of("price", Schema.of(Schema.Type.DOUBLE)),
      Schema.Field.of("item", Schema.of(Schema.Type.STRING))
    );

    ETLStage source = new ETLStage("Table",
      ImmutableMap.of(
        Properties.BatchReadableWritable.NAME, "inputTable",
        Properties.Table.PROPERTY_SCHEMA_ROW_FIELD, "rowkey",
        Properties.Table.PROPERTY_SCHEMA, schema.toString()));
    ETLStage sink = new ETLStage("Table",
      ImmutableMap.of(
        Properties.BatchReadableWritable.NAME, "outputTable",
        Properties.Table.PROPERTY_SCHEMA_ROW_FIELD, "rowkey"));
    ETLBatchConfig etlConfig = new ETLBatchConfig("* * * * *", source, sink, Lists.<ETLStage>newArrayList());
    AdapterConfig adapterConfig = new AdapterConfig("", TEMPLATE_ID.getId(), GSON.toJsonTree(etlConfig));
    Id.Adapter adapterId = Id.Adapter.from(NAMESPACE, "testTableAdapter");
    AdapterManager manager = createAdapter(adapterId, adapterConfig);

    // add some data to the input table
    DataSetManager<Table> inputManager = getDataset("inputTable");
    Table inputTable = inputManager.get();
    Put put = new Put(Bytes.toBytes("row1"));
    put.add("user", "samuel");
    put.add("count", 5);
    put.add("price", 123.45);
    put.add("item", "scotch");
    inputTable.put(put);
    inputManager.flush();
    put = new Put(Bytes.toBytes("row2"));
    put.add("user", "jackson");
    put.add("count", 10);
    put.add("price", 123456789d);
    put.add("item", "island");
    inputTable.put(put);
    inputManager.flush();

    manager.start();
    manager.waitForOneRunToFinish(5, TimeUnit.MINUTES);
    manager.stop();

    DataSetManager<Table> outputManager = getDataset("outputTable");
    Table outputTable = outputManager.get();

    Row row = outputTable.get(Bytes.toBytes("row1"));
    Assert.assertEquals("samuel", row.getString("user"));
    Assert.assertEquals(5, (int) row.getInt("count"));
    Assert.assertTrue(Math.abs(123.45 - row.getDouble("price")) < 0.000001);
    Assert.assertEquals("scotch", row.getString("item"));

    row = outputTable.get(Bytes.toBytes("row2"));
    Assert.assertEquals("jackson", row.getString("user"));
    Assert.assertEquals(10, (int) row.getInt("count"));
    Assert.assertTrue(Math.abs(123456789 - row.getDouble("price")) < 0.000001);
    Assert.assertEquals("island", row.getString("item"));
  }

  @Test
  public void testS3toTPFS() throws Exception {
    String testPath = "s3n://test/2015-06-17-00-00-00.txt";
    String testData = "Sample data for testing.";

    S3NInMemoryFileSystem fs = new S3NInMemoryFileSystem();
    Configuration conf = new Configuration();
    conf.set("fs.s3n.impl", S3NInMemoryFileSystem.class.getName());
    fs.initialize(URI.create("s3n://test/"), conf);
    fs.createNewFile(new Path(testPath));

    FSDataOutputStream writeData = fs.create(new Path(testPath));
    writeData.write(testData.getBytes());
    writeData.flush();
    writeData.close();

    Method method = FileSystem.class.getDeclaredMethod("addFileSystemForTesting",
                                                       new Class[]{URI.class, Configuration.class, FileSystem.class});
    method.setAccessible(true);
    method.invoke(FileSystem.class, URI.create("s3n://test/"), conf, fs);
    ETLStage source = new ETLStage("S3", ImmutableMap.<String, String>builder()
      .put(Properties.S3.ACCESS_KEY, "key")
      .put(Properties.S3.ACCESS_ID, "ID")
      .put(Properties.S3.PATH, testPath)
      .build());

    ETLStage sink = new ETLStage("TPFSAvro",
                                 ImmutableMap.of(Properties.TimePartitionedFileSetDataset.SCHEMA,
                                                 FileBatchSource.DEFAULT_SCHEMA.toString(),
                                                 Properties.TimePartitionedFileSetDataset.TPFS_NAME, "TPFSsink"));
    ETLBatchConfig etlConfig = new ETLBatchConfig("* * * * *", source, sink, Lists.<ETLStage>newArrayList());
    AdapterConfig adapterConfig = new AdapterConfig("", TEMPLATE_ID.getId(), GSON.toJsonTree(etlConfig));
    Id.Adapter adapterId = Id.Adapter.from(NAMESPACE, "testS3Adapter");
    AdapterManager manager = createAdapter(adapterId, adapterConfig);

    manager.start();
    manager.waitForOneRunToFinish(2, TimeUnit.MINUTES);
    manager.stop();

    DataSetManager<TimePartitionedFileSet> fileSetManager = getDataset("TPFSsink");
    TimePartitionedFileSet fileSet = fileSetManager.get();
    List<GenericRecord> records = readOutput(fileSet, FileBatchSource.DEFAULT_SCHEMA);
    Assert.assertEquals(1, records.size());
    Assert.assertEquals(testData, records.get(0).get("body").toString());
    fileSet.close();
  }

  @Test
  public void testFiletoTPFS() throws Exception {
    String filePath = "file:///tmp/test/text.txt";
    String testData = "String for testing purposes.";

    Path textFile = new Path(filePath);
    Configuration conf = new Configuration();
    FileSystem fs = FileSystem.get(conf);
    FSDataOutputStream writeData = fs.create(textFile);
    writeData.write(testData.getBytes());
    writeData.flush();
    writeData.close();

    ETLStage source = new ETLStage("FileBatchSource", ImmutableMap.<String, String>builder()
      .put(Properties.File.FILESYSTEM, "Text")
      .put(Properties.File.PATH, filePath)
      .build());

    ETLStage sink = new ETLStage("TPFSAvro",
                                 ImmutableMap.of(Properties.TimePartitionedFileSetDataset.SCHEMA,
                                                 FileBatchSource.DEFAULT_SCHEMA.toString(),
                                                 Properties.TimePartitionedFileSetDataset.TPFS_NAME, "fileSink"));
    ETLBatchConfig etlConfig = new ETLBatchConfig("* * * * *", source, sink, Lists.<ETLStage>newArrayList());
    AdapterConfig adapterConfig = new AdapterConfig("", TEMPLATE_ID.getId(), GSON.toJsonTree(etlConfig));
    Id.Adapter adapterId = Id.Adapter.from(NAMESPACE, "testFileAdapter");
    AdapterManager manager = createAdapter(adapterId, adapterConfig);

    manager.start();
    manager.waitForOneRunToFinish(2, TimeUnit.MINUTES);
    manager.stop();

    DataSetManager<TimePartitionedFileSet> fileSetManager = getDataset("fileSink");
    TimePartitionedFileSet fileSet = fileSetManager.get();
    List<GenericRecord> records = readOutput(fileSet, FileBatchSource.DEFAULT_SCHEMA);
    Assert.assertEquals(1, records.size());
    Assert.assertEquals(testData, records.get(0).get("body").toString());
    fileSet.close();
  }

}
