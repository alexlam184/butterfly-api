// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
// import utc from "dayjs/plugin/utc";
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Hong_Kong");

type Data = {
  name: string;
};

type RequestBodyType = {
  butterfly: string;
  deviceID: string;
  apiKey: string;
};

const date = dayjs().format();

// const raw =
//   '{\r\n    "datastreams": [{\r\n            "id": "butterfly",\r\n            "datapoints": [{\r\n                    "at": "2023-04-10T14:46:53",\r\n                    "value": "The latest butterfly"\r\n                }\r\n            ]\r\n        }\r\n    ]\r\n}';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body: RequestBodyType = JSON.parse(req.body);
  //   res.status(200).json({ name: body });

  const myHeaders = new Headers();
  myHeaders.append("api-key", body.apiKey);
  myHeaders.append("Content-Type", "text/plain");

  const raw = `{\r\n    "datastreams": [{\r\n            "id": "butterfly",\r\n            "datapoints": [{\r\n                    "at": "${dayjs().format(
    "YYYY-MM-DDTHH:mm:ss"
  )}",\r\n                    "value": "${
    body.butterfly
  }"\r\n                }\r\n            ]\r\n        }\r\n    ]\r\n}`;

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    `http://api.onenet.hk.chinamobile.com/devices/${body.deviceID}/datapoints`,
    // @ts-ignore
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      res.status(200).json({ name: data });
    })
    .catch((error) => {
      console.log("error", error);
      res.status(200).json({ name: error });
    });
}
