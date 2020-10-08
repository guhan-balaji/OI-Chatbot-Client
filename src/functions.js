import axios from "axios";
const getQuery = async (query) => {
  const requestOptions = {
    method: "POST",
    url: "http://localhost:8080/api/textQuery",
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify({ text: query }),
  };

  const response = await (await axios(requestOptions)).data;

  return response;
};

export default getQuery;



//////logic for chatbot.jsx
// toggleMsgLoader();
// const response = await getQuery(newMessage);
// toggleMsgLoader();
// if (response.intent) {
//   if (menu.some((el) => el.title === response.value)) {
//     const data = menu.find((el) => el.title === response.value);
//     renderCustomComponent(() => (
//       <MenuCard title={data.title} options={data.options} />

//     ));
//   } else if (forms.includes(response.value)) {
//     renderCustomComponent(() => <DateForm />);
//   } else {
//     addResponseMessage(response.value);
//   }
// } else {
//   addResponseMessage(response.value);
// }