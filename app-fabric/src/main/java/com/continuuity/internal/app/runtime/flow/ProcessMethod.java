/*
 * Copyright 2012-2013 Continuuity,Inc. All Rights Reserved.
 */

package com.continuuity.internal.app.runtime.flow;

import com.continuuity.app.queue.InputDatum;
import com.google.common.base.Function;

import java.nio.ByteBuffer;

/**
 *
 */
interface ProcessMethod<T> {

  interface ProcessResult<V> {
    V getEvent();

    boolean isSuccess();

    /**
     * Returns the failure cause if result is not success or {@code null} otherwise.
     */
    Throwable getCause();
  }

  boolean needsInput();

  /**
   * Invoke the process method for the given input, using the given decoder to convert raw
   * data into event object.
   * @param input The input to process
   * @param inputDecoder Transformation function to convert input into event object.
   * @return The event being processed, regardless if invocation of process is succeeded or not.
   */
  ProcessResult<T> invoke(InputDatum input, Function<ByteBuffer, T> inputDecoder);
}
