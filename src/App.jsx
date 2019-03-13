import React from 'react';
import Store from './store/Store';
import { reducer, initialState } from './store/Model';
import { CommandBar } from './components/CommandBar';
import { Billboard } from './views/Billboard';
import { ListEditor } from './views/ListEditor';

import 'semantic-ui-css/semantic.min.css';
import './styles/App.scss';

export default function App() {
  const buildView = (view) => {
    switch (view) {
      case 'billboard':
        return <Billboard />;
      case 'listEditor':
        return <ListEditor />;
      default:
        return <Billboard />;
    }
  };

  return (
    <Store rootReducer={reducer} initialValue={initialState}>
      {(currentView) => (
        <div id="main">
          <CommandBar />
          {buildView(currentView)}
        </div>
      )}
    </Store>
  );
}