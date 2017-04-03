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

import React, {PropTypes, Component} from 'react';
import AppOverview from 'components/Overview/AppOverview';
import DatasetOverview from 'components/Overview/DatasetOverview';
import StreamOverview from 'components/Overview/StreamOverview';
import {objectQuery} from 'services/helpers';
import isNil from 'lodash/isNil';
import classnames from 'classnames';
import SearchStore from 'components/EntityListView/SearchStore';
import SearchStoreActions from 'components/EntityListView/SearchStore/SearchStoreActions';
import {updateQueryString} from 'components/EntityListView/SearchStore/ActionCreator';
import {MyMetadataApi} from 'api/metadata';
import NamespaceStore from 'services/NamespaceStore';
import {convertEntityTypeToApi} from 'services/entity-type-api-converter';
require('./Overview.scss');
import T from 'i18n-react';

export default class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: null,
      entity: null,
      showOverview: false
    };
    this.typeToComponentMap = {
      'application': AppOverview,
      'datasetinstance': DatasetOverview,
      'stream': StreamOverview
    };
  }
  componentWillMount() {
    this.searchStoreSubscription = SearchStore.subscribe(() => {
      let searchState = SearchStore.getState().search;
      if (isNil(searchState.overviewEntity)) {
        this.setState({
          entity: null,
          showOverview: false,
          tag: null,
          errorContent: null
        });
        return;
      }
      let {id: entityId, type: entityType} = searchState.overviewEntity;
      let entityTypeLabel = entityType;
      entityType = convertEntityTypeToApi(entityType || entityType);
      let namespace = NamespaceStore.getState().selectedNamespace;
      MyMetadataApi
        .getMetadata({
          namespace,
          entityId,
          entityType
        })
        .subscribe(
          () => {
            this.setState({
              entity: searchState.overviewEntity,
              errorContent: null,
              showOverview: true,
              tag: this.typeToComponentMap[objectQuery(searchState.overviewEntity, 'type')]
            }, this.scrollEntityToView.bind(this));
          },
          (err) => {
            if (err.statusCode === 404) {
              this.setState({
                errorContent: (
                  <div className="overview-error-container">
                    <h4>
                      <strong>
                        {T.translate('features.Overview.errorMessage404', {entityId, entityType: entityTypeLabel})}
                      </strong>
                    </h4>
                    <span>{T.translate('features.Overview.errorMessageSubtitle')}</span>
                  </div>
                ),
                showOverview: true
              });
            }
            if (err.statusCode === 403) {
              this.setState({
                errorContent: (
                  <div className="overview-error-container">
                    <h4>
                      <strong>
                        {T.translate('features.Overview.errorMessageAuthorization', {entityId, entityType: entityTypeLabel})}
                      </strong>
                    </h4>
                    <span>{T.translate('features.Overview.errorMessageSubtitle')}</span>
                  </div>
                ),
                showOverview: true
              });
            }
          }
        );
    });
  }
  scrollEntityToView() {
    if (isNil(this.state.entity) || !objectQuery(this.state, 'entity', 'uniqueId')) {
      return;
    }
    let el = document.getElementById(this.state.entity.uniqueId);
    if (isNil(el)) {
      return;
    }
    let paginationContainer = document.querySelector('.entity-list-view');
    el.scrollIntoView();
    if (paginationContainer.scrollTop < paginationContainer.scrollHeight - paginationContainer.offsetHeight) {
      paginationContainer.scrollTop -= 120;
    }
  }
  componentDidMount() {
    this.scrollEntityToView();
  }
  componentDidUpdate() {
    this.scrollEntityToView();
  }
  componentWillUnmount() {
    if (this.searchStoreSubscription) {
      this.searchStoreSubscription();
    }
  }
  hideOverview() {
    this.setState({
      showOverview: false
    });
    SearchStore.dispatch({
      type: SearchStoreActions.RESETOVERVIEWENTITY
    });
    updateQueryString();
  }
  closeAndRefresh(action) {
    this.hideOverview();
    if (action === 'delete') {
      if (this.props.onCloseAndRefresh) {
        this.props.onCloseAndRefresh();
      }
    }
  }
  render() {
    let Tag = this.state.tag || 'div';
    return (
      <div className={classnames("overview-container", {"show-overview": this.state.showOverview })}>
        <div className="overview-wrapper" >
          {
            this.state.errorContent ?
              this.state.errorContent
            :
              React.createElement(
                Tag,
                {
                  entity: this.state.entity,
                  onClose: this.hideOverview.bind(this),
                  onCloseAndRefresh: this.closeAndRefresh.bind(this)
                }
              )
          }
        </div>
      </div>
    );
  }
}

Overview.propTypes = {
  onCloseAndRefresh: PropTypes.func
};
