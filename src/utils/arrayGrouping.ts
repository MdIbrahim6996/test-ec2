export const graphData = (data: any) => {
  const lateArray = [];
  const ontimeArray = [];

  for (const [key, value] of Object.entries(data)) {
    let late = 0;
    let ontime = 0;
    let absent = 0;

    const date = new Date();

    const totalDays = new Date(date.getFullYear(), parseInt(key), 0).getDate();

    //@ts-ignore
    for (const entry of value) {
      if (entry.isLate) {
        late++;
      } else {
        ontime++;
      }
    }
    lateArray[parseInt(key) - 1] = late;
    ontimeArray[parseInt(key) - 1] = ontime;
    absent = totalDays - (late + ontime);
    console.log(key, absent);
  }
  return { lateArray, ontimeArray };
};
