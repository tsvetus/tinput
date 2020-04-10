import React from 'react';

import {TGroup, TPopup} from 'tinput';

class TGroupExample extends React.Component {

  render() {

    return (

      <div>

        <TGroup
          style={{
            container: {margin: "0 0 16px 0"},
            content: {justifyContent: "space-around"}
          }}>

          <TPopup
            style={{
              container: {width: "300px"},
              content: {padding: "8px 0 8px 0", textAlign: "justify"}
            }}
            label={'Click to show/hide content'}>
            <div>How do you fry an egg in oil?</div>
            <div>
              Heat about 2 teaspoons of olive oil in a medium
              pan (about 9 inch diameter) over medium to high
              heat. When olive oil is hot (after about 1-2
              minutes), crack the egg in the pan and fry for
              about 2-3 minutes. Once ends have browned, remove
              from pan. Sprinkle with thick sea salt and
              freshly ground pepper.
            </div>
          </TPopup>

        </TGroup>

      </div>

    );

  }

}

export default TGroupExample;