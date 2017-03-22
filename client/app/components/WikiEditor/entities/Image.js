const Image = (props) => {
  const {src, alt} = props.contentState.getEntity(props.entityKey).getData();
  return (
    <img src={src} alt={alt} />
  );
}

export default Image;