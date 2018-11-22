import * as React from 'react';

type DummyProps = {
  /** Title of the document */
  title?: String;
};

/**
 * Dummy component
 */
const Dummy: React.SFC<DummyProps> = ({ title }) => <h1>{title}</h1>;

Dummy.defaultProps = {
  title: 'Delete me!'
};

export { Dummy };
