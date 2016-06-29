/*
 * Copyright © 2016 Cask Data, Inc.
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

package co.cask.cdap.security.spi.authorization;

import co.cask.cdap.api.annotation.Beta;
import co.cask.cdap.proto.id.EntityId;
import co.cask.cdap.proto.security.Action;
import co.cask.cdap.proto.security.Principal;

/**
 * Enforces authorization for a {@link Principal} to perform an {@link Action} on an {@link EntityId}.
 */
@Beta
public interface AuthorizationEnforcer {

  /**
   * Enforces authorization for the specified {@link Principal} for the specified {@link Action} on the specified
   * {@link EntityId}.
   *
   * @param entity the {@link EntityId} on which authorization is to be enforced
   * @param principal the {@link Principal} that performs the actions
   * @param action the {@link Action} being performed
   * @throws UnauthorizedException if the principal is not authorized to perform action on the entity
   * @throws Exception if any other errors occurred while performing the authorization enforcement check
   */
  void enforce(EntityId entity, Principal principal, Action action) throws Exception;
}
