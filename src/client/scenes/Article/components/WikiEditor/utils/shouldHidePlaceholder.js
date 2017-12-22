const shouldHidePlaceholder = contentState => {
  if (!contentState.hasText()) {
    if (
      contentState
        .getBlockMap()
        .first()
        .getType() !== "unstyled"
    ) {
      return true;
    }
  }

  return false;
};

export default shouldHidePlaceholder;
