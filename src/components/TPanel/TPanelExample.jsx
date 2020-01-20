import React from 'react';

import {TPanel, TGroup} from 'tinput';

class TPanelExample extends React.Component {

  render() {

    return (

      <div>

        <TGroup
          style={{
            container: {margin: "0 0 16px 0"},
            content: {justifyContent: "space-around"}
          }}>

          <TPanel
            style={{
              container: {
                width: "100%",
                padding: "16px",
                textAlign: "center"
              },
            }} >
            <div>Panel content</div>
          </TPanel>

        </TGroup>

      </div>

    );

  }

}

export default TPanelExample;