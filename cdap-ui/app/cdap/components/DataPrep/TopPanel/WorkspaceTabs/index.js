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

import React, { Component } from 'react';
import DataPrepStore from 'components/DataPrep/store';
import DataPrepActions from 'components/DataPrep/store/DataPrepActions';
import MyDataPrepApi from 'api/dataprep';
import NamespaceStore from 'services/NamespaceStore';
import cookie from 'react-cookie';
import {setWorkspace} from 'components/DataPrep/store/DataPrepActionCreator';
import WorkspaceModal from 'components/DataPrep/TopPanel/WorkspaceTabs/WorkspaceModal';
import WorkspacePropertiesModal from 'components/DataPrep/TopPanel/WorkspaceTabs/WorkspacePropertiesModal';
import ee from 'event-emitter';

require('./WorkspaceTabs.scss');

export default class WorkspaceTabs extends Component {
  constructor(props) {
    super(props);

    let initialState = DataPrepStore.getState().dataprep;

    this.state = {
      activeWorkspace: initialState.workspaceId,
      workspaceList: [],
      workspaceModal: false,
      workspacePropertiesModal: false
    };

    this.toggleCreateWorkspace = this.toggleCreateWorkspace.bind(this);
    this.toggleWorkspacePropertiesModal = this.toggleWorkspacePropertiesModal.bind(this);
    this.getWorkspaceList = this.getWorkspaceList.bind(this);
    this.eventEmitter = ee(ee);



    this.eventEmitter.on('DATAPREP_OPEN_UPLOAD', this.toggleWorkspacePropertiesModal);

    this.sub = DataPrepStore.subscribe(() => {
      this.setState({
        activeWorkspace: DataPrepStore.getState().dataprep.workspaceId
      });
    });
  }

  componentWillMount() {
    this.getWorkspaceList();
  }

  componentWillUnmount() {
    if (this.sub) {
      this.sub();
    }

    this.eventEmitter.off('DATAPREP_OPEN_UPLOAD', this.toggleWorkspacePropertiesModal);
  }

  getWorkspaceList() {
    let namespace = NamespaceStore.getState().selectedNamespace;

    MyDataPrepApi.getWorkspaceList({ namespace })
      .subscribe((res) => {
        if (!this.state.activeWorkspace && res.values.length > 0) {
          this.setActiveWorkspace(res.values[0]);
        }

        this.setState({
          workspaceList: res.values.sort()
        });

        if (res.values.length === 0) {
          this.toggleCreateWorkspace();
        }
      }, (err) => {
        console.log('Workspace List Error', err);
      });
  }

  setActiveWorkspace(workspaceId) {
    DataPrepStore.dispatch({
      type: DataPrepActions.enableLoading
    });

    setWorkspace(workspaceId)
      .subscribe(() => {
        cookie.save('DATAPREP_WORKSPACE', workspaceId, { path: '/' });
        DataPrepStore.dispatch({
          type: DataPrepActions.disableLoading
        });
      }, (err) => {
        console.log('err', err);
        DataPrepStore.dispatch({
          type: DataPrepActions.disableLoading
        });
      });
  }

  toggleCreateWorkspace() {
    this.setState({
      workspaceModal: !this.state.workspaceModal
    });
  }

  toggleWorkspacePropertiesModal() {
    this.setState({
      workspacePropertiesModal: !this.state.workspacePropertiesModal
    });
  }

  renderCreateWorkspaceModal() {
    if (!this.state.workspaceModal) { return null; }

    return (
      <WorkspaceModal
        toggle={this.toggleCreateWorkspace}
        onCreate={this.getWorkspaceList}
        isEmpty={this.state.workspaceList.length === 0}
      />
    );
  }

  renderWorkspacePropertiesModal() {
    if (!this.state.workspacePropertiesModal) { return null; }

    return (
      <WorkspacePropertiesModal
        toggle={this.toggleWorkspacePropertiesModal}
        workspace={this.state.activeWorkspace}
        onDelete={this.getWorkspaceList}
      />
    );
  }

  renderActiveWorkspace() {
    return (
      <div
        className="active-workspace"
        onClick={this.toggleWorkspacePropertiesModal}
      >
        <span>
          {this.state.activeWorkspace}
        </span>
        <span className="fa fa-pencil" />
        {this.renderWorkspacePropertiesModal()}
      </div>
    );
  }

  renderWorkspaceTabs() {
    let workspaceList = this.state.workspaceList.filter((workspaceId) => {
      return workspaceId !== this.state.activeWorkspace;
    });

    return (
      <div className="workspace-tabs-list">
        {
          workspaceList.map((workspace) => {
            return (
              <div
                key={workspace}
                className="workspace-tab"
                onClick={this.setActiveWorkspace.bind(this, workspace)}
                title={workspace}
              >
                {workspace}
              </div>
            );
          })
        }

        <div
          className="workspace-tab text-xs-center"
          onClick={this.toggleCreateWorkspace}
        >
          <span className="fa fa-plus" />

          {this.renderCreateWorkspaceModal()}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="workspace-tabs">
        {this.renderActiveWorkspace()}
        {this.renderWorkspaceTabs()}
      </div>
    );
  }
}
