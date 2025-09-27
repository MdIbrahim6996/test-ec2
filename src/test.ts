const body = {
  leadByUserId: 4,

  title: "Mr.",
  firstName: "first",
  middleName: "middle",
  lastName: "last",
  centre: "001",
  address: "address",
  city: "city",
  county: "county",
  pincode: "post34343",
  password: "",
  dateOfBirth: "1954-09-01",
  phone: "3432423432",
  poa: "true",
  process: "5",
  plan: "8",
  closer: "11",
  verifier: "11",
  applianceName: ["wash"],
  makeOfAppliance: ["make"],
  ageOfAppliance: ["10"],
  paymentMethod: "directDebit",
  shift: "UK",
  bankName: "bank",
  accountName: "account",
  accountNumber: "3242 3423",
  sort: "43 24 23",
  cardName: "",
  cardBankName: "",
  cardNumber: "",
  expiry: "",
  cardCvv: "",
  comment: "comment",
};

import loadtest from "loadtest";

const options = {
  url: "http://localhost:8000/test", // your route
  concurrency: 50, // 5 users at a time
  maxRequests: 500, // total requests
  method: "POST" as "POST",
  contentType: "application/json",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ ...body }),
  statusCallback: (error: any, result: any, latency: any) => {
    if (error) {
      console.error("❌ Request failed:", error);
    } else if (result.statusCode >= 400) {
      console.warn("⚠️ Bad response:", result.statusCode, result.body);
    } else {
      console.log("✅ Success:", result.statusCode);
    }
  },
};

loadtest.loadTest(options, function (error: any, result: any) {
  if (error) {
    return console.error("❌ Got an error: %s", error);
  }
  console.log("✅ Load test finished:");
  console.log(result);
});
