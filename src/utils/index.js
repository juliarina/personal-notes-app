const showFormattedDate = (date, locale) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString(locale === 'id'? 'id-ID' : 'en-US', options);
};
export { showFormattedDate };
