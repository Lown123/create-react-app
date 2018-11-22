import React from 'react';

type DummyProps = {
  /** Title of the document */  
  title?: String;
};

/**
 * Dummy component
 */
const Dummy: React.SFC<DummyProps> = ({ title = 'Delete me!' }) => (
  <h1>{title}</h1>
);

export default Dummy;
