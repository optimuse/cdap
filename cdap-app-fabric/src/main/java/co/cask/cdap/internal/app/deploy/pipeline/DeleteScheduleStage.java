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

import co.cask.cdap.api.schedule.ScheduleSpecification;
import co.cask.cdap.internal.app.runtime.schedule.Scheduler;
import co.cask.cdap.proto.ProgramType;
import com.google.common.collect.MapDifference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;

/**
 * This {@link co.cask.cdap.pipeline.Stage} is responsible for deletion of any schedule which was dropped
 * during application re-deployment. Schedules are created and updated in {@link CreateSchedulesStage}.
 * These two stages are separate to avoid schedule triggers before app registration. See CDAP-8918 for details
 */
public class DeleteScheduleStage extends AbstractScheduleStage {

  private static final Logger LOG = LoggerFactory.getLogger(DeleteScheduleStage.class);

  public DeleteScheduleStage(Scheduler scheduler) {
    super(scheduler);
  }

  @Override
  public void process(ApplicationWithPrograms input) throws Exception {
    // drop deleted schedules
    MapDifference<String, ScheduleSpecification> mapDiff = getScheduleDiff(input);
    for (Map.Entry<String, ScheduleSpecification> entry : mapDiff.entriesOnlyOnLeft().entrySet()) {
      // delete schedules that existed in the old app spec, but don't anymore
      ScheduleSpecification scheduleSpec = entry.getValue();
      ProgramType programType = ProgramType.valueOfSchedulableType(scheduleSpec.getProgram().getProgramType());
      LOG.debug("Deleting schedule {} with specification {}", entry.getKey(), scheduleSpec);
      deleteSchedule(input.getApplicationId().program(programType, scheduleSpec.getProgram().getProgramName()),
                     scheduleSpec);
    }

    // for the entries which differ schedule type delete them here so that we can re-create them again in
    // CreateScheduleStage with new type and spec. Its required to delete it here because in next stage the
    // application will be registered updating the schedule spec. See CDAP-8918 for details.
    for (Map.Entry<String, MapDifference.ValueDifference<ScheduleSpecification>> entry :
      mapDiff.entriesDiffering().entrySet()) {
      ScheduleSpecification newScheduleSpec = entry.getValue().rightValue();
      ScheduleSpecification oldScheduleSpec = entry.getValue().leftValue();
      if (!newScheduleSpec.getSchedule().getClass().equals(oldScheduleSpec.getSchedule().getClass())) {
        LOG.debug("Deleting existing schedule {} with specification {}. It will be created with specification {} " +
                    "as they differ in schedule type.", entry.getKey(), oldScheduleSpec, newScheduleSpec);
        ProgramType programType = ProgramType.valueOfSchedulableType(newScheduleSpec.getProgram().getProgramType());
        deleteSchedule(input.getApplicationId().program(programType, oldScheduleSpec.getProgram().getProgramName()),
                       oldScheduleSpec);
      }
    }
    // Emit the input to next stage.
    emit(input);
  }
}
