export const updateObjectInArray = (
  items: any,
  itemId: number | string,
  propName: any,
  objProps: any
) => {
  return items.map((u: any) => {
    if (u[propName] === itemId) {
      return {...u, ...objProps}
    }
    return u;
  });
};
