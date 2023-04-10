// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dayjs from "dayjs";

type Data = {
  name: string;
};

const myHeaders = new Headers();
myHeaders.append("api-key", "1EiJMNxAFieGuubW=TiRVN1kYGA=");
myHeaders.append("Content-Type", "text/plain");

const date = dayjs().format();
const butterfly_type = "hello";

// const raw =
//   '{\r\n    "datastreams": [{\r\n            "id": "butterfly",\r\n            "datapoints": [{\r\n                    "at": "2023-04-10T14:46:53",\r\n                    "value": "The latest butterfly"\r\n                }\r\n            ]\r\n        }\r\n    ]\r\n}';

const raw = `{\r\n    "datastreams": [{\r\n            "id": "butterfly",\r\n            "datapoints": [{\r\n                    "at": "${dayjs().format(
  "YYYY-MM-DDTHH:mm:ss"
)}",\r\n                    "value": "${butterfly_type}"\r\n                }\r\n            ]\r\n        }\r\n    ]\r\n}`;

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow",
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //res.status(200).json({ name: 'Lion Rock222' });

  if (req.method === "POST") {
    // Process a POST request
    res.status(200).json({ name: "POST butterfly" });
  } else {
    // Handle any other HTTP method
    res.status(200).json({ name: "GET butterfly" });
  }

  fetch(
    "http://api.onenet.hk.chinamobile.com/devices/161110960/datapoints",
    // @ts-ignore
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      res.status(200).json({ name: result });
    })
    .catch((error) => {
      console.log("error", error);
      res.status(200).json({ name: error });
    });
}
