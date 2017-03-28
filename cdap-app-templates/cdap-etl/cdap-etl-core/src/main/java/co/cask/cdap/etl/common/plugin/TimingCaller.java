/*
 * Copyright © 2017 Cask Data, Inc.
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

package co.cask.cdap.etl.common.plugin;

import co.cask.cdap.etl.api.StageMetrics;
import co.cask.cdap.etl.common.Constants;
import com.google.common.base.Stopwatch;

import java.util.concurrent.Callable;

/**
 * Times how long it takes to call a callable, and emits it as a metric.
 */
public class TimingCaller extends Caller {
  public static final String PROCESS_TIME = "process.time.ms";
  private final Caller delegate;
  private final StageMetrics stageMetrics;
  private final Stopwatch stopwatch;

  private TimingCaller(Caller delegate, StageMetrics stageMetrics) {
    this.delegate = delegate;
    this.stageMetrics = stageMetrics;
    this.stopwatch = new Stopwatch();
  }

  @Override
  public <T> T call(Callable<T> callable) throws Exception {
    stopwatch.start();
    try {
      return delegate.call(callable);
    } finally {
      emitTimeSpent(stopwatch.elapsedMillis());
      stopwatch.reset();
    }
  }

  private void emitTimeSpent(long millis) {
    while (millis > Integer.MAX_VALUE) {
      // this should never happen, it means ~5533 hours were spent
      stageMetrics.count(Constants.PROCESS_TIME, Integer.MAX_VALUE);
      millis -= Integer.MAX_VALUE;
    }
    stageMetrics.count(Constants.PROCESS_TIME, (int) millis);
  }

  public static Caller wrap(Caller delegate, StageMetrics stageMetrics) {
    return new TimingCaller(delegate, stageMetrics);
  }
}
