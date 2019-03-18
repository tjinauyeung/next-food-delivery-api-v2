const MealMapper = {
  fromJSON(meal) {
    return {
      _id: meal.id,
      name: meal.name,
      description: meal.description,
      price: meal.price
    };
  },

  toJSON(meal) {
    return {
      id: meal._id,
      name: meal.name,
      description: meal.description,
      price: meal.price,
      createdAt: meal.createdAt
    };
  },

  mapToJSON(meals: any[]) {
    return meals.map(MealMapper.toJSON);
  }
};

export default MealMapper;
