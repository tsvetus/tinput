import React from 'react';

import {TScroll, TGroup} from 'tinput';

class TGroupExample extends React.Component {

    render () {

        return (

            <div>

                <TGroup style={{
                    container: {margin: "0 0 16px 0"}
                }}>

                    <TScroll
                        style={{
                            container: {
                                height: "150px"
                            },
                            content: {
                                padding: "16px",
                                display: "flex",
                                justifyContent: "center"
                            }
                        }} >

                        <div
                            style={{
                                width: "300px",
                                textAlign: "justify"
                            }} >
                            Tears glistened in her eyes. And
                            when we steamed slowly out of the
                            lagoon, making our way gingerly
                            through the opening in the reef,
                            and then steered for the open sea,
                            a certain melancholy fell upon me.
                            The breeze was laden still with
                            the pleasant odours of the land.
                            Tahiti is very far away, and I
                            knew that I should never see it
                            again. A chapter of my life was
                            closed, and I felt a little nearer
                            to inevitable death.
                        </div>

                    </TScroll>

                </TGroup>

            </div>

        );

    }

}

export default TGroupExample;