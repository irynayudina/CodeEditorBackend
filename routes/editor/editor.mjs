// const express = require('express');
// const router = express.Router();
// const axios = require("axios");
// const { languages, sampleCodes, languageVersions } = require('./EditorData');
import express from "express";
import axios from "axios";
import { languages, sampleCodes, languageVersions } from "./EditorData.mjs";

const router = express.Router();

router.post('/executeJS', async (req, res) => {
  const { code } = req.body;
  const result = { ode: code, language: 'js'};

  res.json(result);
})
router.get('/', (req, res) => {
  res.json({'route':'editor', 'method':'get'})
})

router.post('/execute', async (req, res) => {
  const { language, version, code, userInput, cmdargs } = req.body;  
  if (!language || !code || !version) {
    return res.status(400).send('not full data sent with request');
  }
  if (!Object.keys(languages).includes(language)) {
    return res.status(400).send('incorrect language format');
  }
  if (languageVersions[language].length <= version || version < 0) {
    return res.status(400).send('incorrect language version');
  }
  console.log(languageVersions[language].length)
  const program = {
    script: code,
    stdin: userInput,
    args: cmdargs,
    language: language,
    versionIndex: version,
    clientId: "38157445441da9562454315059d696da",
    clientSecret: "fe6ed94ff0ddac37d10413b63308ead1deac8bc626bcf3abc40da90d2b519650"
  };
  try {
    const response = await axios.post('https://api.jdoodle.com/v1/execute', program, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const responseBody = response.data;
    console.log('statusCode:', response.status);
    console.log('body:', responseBody);
    res.json(responseBody);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error executing code');
  }
});

// module.exports = router;
export default router;
