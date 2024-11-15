/**
 * This file contains the functions that interact with the OpenAI API.
 * The purpose of the strict_output function is to ensure the consistency of the results generated by OpenAI to be JSON.
 */

import OpenAi from "openai";

const openai = new OpenAi({
  apiKey: process.env.OPENAI_API_KEY,
});

type OutputFormat = {
  [key: string]: string | string;
};

export async function gpt(
  system_prompt: string,
  user_prompt: string,
  output_format: OutputFormat,
  model: string = "gpt-3.5-turbo",
) {
  let output_format_prompt = `\nOutput in the following json string format: " + ${JSON.stringify(output_format)} + "\nBe concise. \nDo not put quotation marks or escape character \\ in the output fields.`;

  let my_system_prompt = `${JSON.stringify(system_prompt)} + ${JSON.stringify(output_format_prompt)}`;

  try {
    const response = await openai.chat.completions.create({
      model: model,
      messages: [
        {
          role: "system",
          content: my_system_prompt,
        },
        { role: "user", content: user_prompt.toString() },
      ],
      response_format: {
        type: "json_object",
      },
    });

    console.log(response.choices[0]);

    const generatedText = response.choices[0].message?.content ?? "";

    if (generatedText.length) {
      const res = JSON.parse(generatedText);
      return res;
    }

    return generatedText;
  } catch (error) {
    console.log("ERROR: Error when generating with OpenAI:", error);
    return {};
  }
}

export async function generateSummary(
  system_prompt: string,
  user_prompt: string,
  model: string = "gpt-3.5-turbo",
): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      temperature: 1,
      model: model,
      messages: [
        {
          role: "system",
          content: system_prompt,
        },
        { role: "user", content: user_prompt.toString() },
      ],
    });

    if (!response.choices[0].message.content) {
      return "";
    }

    return response.choices[0].message.content;
  } catch (error) {
    return "";
  }
}
