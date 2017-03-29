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

package co.cask.cdap.internal.app.deploy.pipeline;

import co.cask.cdap.api.app.ApplicationSpecification;
import co.cask.cdap.api.schedule.Schedule;
import co.cask.cdap.api.schedule.ScheduleSpecification;
import co.cask.cdap.common.NotFoundException;
import co.cask.cdap.internal.app.runtime.schedule.Scheduler;
import co.cask.cdap.internal.app.runtime.schedule.SchedulerException;
import co.cask.cdap.pipeline.AbstractStage;
import co.cask.cdap.proto.id.ProgramId;
import com.google.common.collect.ImmutableMap;
import com.google.common.collect.MapDifference;
import com.google.common.collect.Maps;
import com.google.common.reflect.TypeToken;

import java.util.Map;

/**
 * An Abstract stage for {@link Schedule} creation, update and delete.
 */
public abstract class AbstractScheduleStage extends AbstractStage<ApplicationWithPrograms> {

  protected final Scheduler scheduler;

  AbstractScheduleStage(Scheduler scheduler) {
    super(TypeToken.of(ApplicationWithPrograms.class));
    this.scheduler = scheduler;
  }

  MapDifference<String, ScheduleSpecification> getScheduleDiff(ApplicationWithPrograms input) {

    ApplicationSpecification existingAppSpec = input.getExistingAppSpec();
    Map<String, ScheduleSpecification> existingSchedulesMap;
    if (existingAppSpec == null) {
      existingSchedulesMap = ImmutableMap.of();
    } else {
      existingSchedulesMap = existingAppSpec.getSchedules();
    }

    return Maps.difference(existingSchedulesMap, input.getSpecification().getSchedules());
  }

  protected boolean isSchedulesEqual(ScheduleSpecification scheduleSpec, ScheduleSpecification anotherScheduleSpec) {
    // The schedules are exactly the same - the difference in spec might come from the properties map -
    // hence it is useless to update the schedule
    return anotherScheduleSpec.getSchedule().equals(scheduleSpec.getSchedule());
  }

  protected void deleteSchedule(ProgramId programId, ScheduleSpecification scheduleSpec)
    throws NotFoundException, SchedulerException {
    scheduler.deleteSchedule(programId, scheduleSpec.getProgram().getProgramType(),
                             scheduleSpec.getSchedule().getName());
  }
}
