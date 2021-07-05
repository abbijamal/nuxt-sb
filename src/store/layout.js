
export const state = () => ({
  data: {},
  font: {},
  preventScrolling: false,
  toggleDirection: false
});

export const mutations = {
  data (state, data) {
    state.data = data;
  },
  font (state, data) {
    state.font = data;
  },
  preventScrolling (state, data) {
    state.preventScrolling = Boolean(data);
  },
  toggleDirection (state, data) {
    state.toggleDirection = Boolean(data);
  }
};

export const getters = {
  data (state) {
    return state.data;
  },
  font (state) {
    return state.font;
  },
  preventScrolling (state) {
    return state.preventScrolling;
  },
  toggleDirection (state) {
    return state.toggleDirection;
  }
};

export const actions = {
  setData (context, value) {
    context.commit('data', value);
  },
  font (context, value) {
    context.commit('font', value);
  },
  toggleDirection (context, value) {
    context.commit('toggleDirection', value);
  },
  togglePreventScrolling (context, preventScrolling) {
    let toggle = !context.getters.preventScrolling;
    if (preventScrolling !== undefined) {
      toggle = preventScrolling;
    }
    context.commit('preventScrolling', toggle);
  }
};
