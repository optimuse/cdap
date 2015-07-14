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

package co.cask.cdap.proto.codec;

import co.cask.cdap.api.Resources;
import co.cask.cdap.api.data.stream.StreamSpecification;
import co.cask.cdap.internal.dataset.DatasetCreationSpec;
import co.cask.cdap.api.worker.WorkerSpecification;
import com.google.common.collect.Maps;
import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParseException;
import com.google.gson.JsonSerializationContext;

import java.lang.reflect.Type;
import java.util.Map;
import java.util.Set;

/**
 * Codec to serialize and deserialize {@link WorkerSpecification}
 */
public final class WorkerSpecificationCodec extends AbstractSpecificationCodec<WorkerSpecification> {

  @Override
  public JsonElement serialize(WorkerSpecification spec, Type typeOfSrc, JsonSerializationContext context) {
    JsonObject object = new JsonObject();
    object.addProperty("className", spec.getClassName());
    object.addProperty("name", spec.getName());
    object.addProperty("description", spec.getDescription());
    object.add("properties", serializeMap(spec.getProperties(), context, String.class));
    object.add("resources", context.serialize(spec.getResources(), Resources.class));
    object.add("datasets", serializeSet(spec.getDatasets(), context, String.class));
    object.addProperty("instances", spec.getInstances());
    object.add("streams", serializeMap(spec.getStreams(), context, StreamSpecification.class));
    object.add("dataSetModules", serializeMap(spec.getDataSetModules(), context, String.class));
    object.add("dataSetInstances", serializeMap(spec.getDataSetInstances(), context, DatasetCreationSpec.class));
    return object;
  }

  @Override
  public WorkerSpecification deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context)
    throws JsonParseException {
    JsonObject jsonObj = (JsonObject) json;

    String className = jsonObj.get("className").getAsString();
    String name = jsonObj.get("name").getAsString();
    String description = jsonObj.get("description").getAsString();
    Map<String, String> properties = deserializeMap(jsonObj.get("properties"), context, String.class);
    Resources resources = context.deserialize(jsonObj.get("resources"), Resources.class);
    Set<String> datasets = deserializeSet(jsonObj.get("datasets"), context, String.class);
    int instances = jsonObj.get("instances").getAsInt();

    JsonElement streamElement = jsonObj.get("streams");
    Map<String, StreamSpecification> streams = (streamElement == null) ?
      Maps.<String, StreamSpecification>newHashMap() : deserializeMap(streamElement, context,
                                                                      StreamSpecification.class);

    JsonElement dataSetModElement = jsonObj.get("dataSetModules");
    Map<String, String> dataSetModules = (dataSetModElement == null) ? Maps.<String, String>newHashMap() :
      deserializeMap(dataSetModElement, context, String.class);

    JsonElement dataSetInstElement = jsonObj.get("dataSetInstances");
    Map<String, DatasetCreationSpec> dataSetInstances = (dataSetInstElement == null) ?
      Maps.<String, DatasetCreationSpec>newHashMap() : deserializeMap(dataSetInstElement, context,
                                                                      DatasetCreationSpec.class);

    return new WorkerSpecification(className, name, description, properties, datasets, resources, instances,
                                   streams, dataSetModules, dataSetInstances);
  }
}
