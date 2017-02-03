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

package co.cask.cdap.logging.framework;

import co.cask.cdap.common.conf.CConfiguration;
import com.google.common.util.concurrent.AbstractIdleService;
import com.google.inject.Inject;

/**
 *
 */
public class LogService extends AbstractIdleService {

  private final CConfiguration cConf;

  @Inject
  LogService(CConfiguration cConf) {
    this.cConf = cConf;
  }

  @Override
  protected void startUp() throws Exception {

  }

  @Override
  protected void shutDown() throws Exception {

  }
}