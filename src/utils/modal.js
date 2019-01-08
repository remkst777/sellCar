export const showModal = id => {
  window.$(`#${id}`).modal('show');
};

export const hideModal = id => {
  window.$(`#${id}`).modal('hide');
};

export const hideAllActiveModals = () => {
  window.$('.modal').modal('hide');
};
