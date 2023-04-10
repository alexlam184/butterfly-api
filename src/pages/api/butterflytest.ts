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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/plain");
  myHeaders.append("api-key", "1EiJMNxAFieGuubW=TiRVN1kYGA=");

  try {
    const body = req.body;
    let obj = null;
    try {
      obj = JSON.parse(body);
    } catch (e) {
      obj = {
        butterfly: "default",
        deviceID: "161110960",
        apiKey: "1EiJMNxAFieGuubW=TiRVN1kYGA=",
      };
    }

    // const raw =
    //   '{\r\n    "datastreams": [{\r\n            "id": "butterfly",\r\n            "datapoints": [{\r\n                    "at": "2023-04-10T14:46:53",\r\n                    "value": "The latest butterfly123"\r\n                }\r\n            ]\r\n        }\r\n    ]\r\n}';

    const raw = `{\r\n    "datastreams": [{\r\n            "id": "butterfly",\r\n            "datapoints": [{\r\n                    "at": "${dayjs().format(
      "YYYY-MM-DDTHH:mm:ss"
    )}",\r\n                    "value": "${
      body.butterfly + "what"
    }"\r\n                }\r\n            ]\r\n        }\r\n    ]\r\n}`;

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `http://api.onenet.hk.chinamobile.com/devices/161110960/datapoints`,
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
  } catch (e) {
    res.status(200).json({ name: "fail:" + e });
  }
}
