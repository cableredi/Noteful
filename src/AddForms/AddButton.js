import React from 'react';

export default function AddButton(props) {
  const { tag, className, children, ...otherProps } = props;

  return React.createElement (
    props.tag,
    {
      className: props.className,
      ...otherProps
    },
    props.children
  )
}

AddButton.defaultProps = {
  tag: 'a',
}