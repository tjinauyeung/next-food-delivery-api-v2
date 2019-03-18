const MealMapper = {
  fromJSON({ id, ...meal }) {
    return {
      _id: id,
      ...meal
    };
  },

  toJSON({ _id, ...meal }) {
    return {
      id: _id,
      name: meal.name,
      description: meal.description,
      price: meal.price,
      createdAt: meal.createdAt
    };
  },

  mapToJSON(meals) {
    return meals.map(MealMapper.mapToJSON);
  }
};

export default MealMapper;
