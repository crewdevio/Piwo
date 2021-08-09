/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

class Body {
  static parseToJSON(body: string[]) {
    return JSON.parse(inputToObject(body));
  }

  static parseToFormData(body: string[]) {
    if (!body.length) return;

    const formData = new FormData();
    const objectData = JSON.parse(inputToObject(body) as string);

    for (const key in objectData) {
      formData.append(key, objectData[key]);
    }

    return formData;
  }
}

function inputToObject(body: string[]) {
  const regex =
    /(?=[a-zA-Z0-9-_]+=)?=|(?=(\s?)[a-zA-Z0-9-_"]+(\s?))\s|[a-zA-Z0-9-_.@]+|("(\\u[a-zA-Z0-9]+|\\[^u]|[^\\"])*"(\s*=)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g;
  const stringified = stringifyInput(body);
  const result = stringified.replace(regex, (match) => {
    if (/=/.test(match)) return `: `;

    if (
      /"(\\u[a-zA-Z0-9]+|\\[^u]|[^\\"])*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/
        .test(match)
    ) {
      return match;
    }

    if (/\s/.test(match)) return ", ";

    return `"${match}"`;
  });

  return `{ ${result} }`;
}

function stringifyInput(body: string[]) {
  body = [""].concat(body);
  return body.reduce((acc, property) => {
    const splited = property.split("=");
    const restOfKeys = splited.slice(0, -2).join("=");
    const [key, value] = splited.slice(-2);
    const whitespace = acc ? " " : "";

    if (value) {
      const text = handleKeyAndValue({ restOfKeys, key, value });
      return acc + whitespace + text;
    }

    const { clearedText: clearProp, brackets: propBrackets } = removeBrackets(
      property,
    );
    let addText = `${propBrackets.open}${clearProp}${propBrackets.close}`;

    if (property.includes(" ")) {
      addText = `${propBrackets.open}"${clearProp}"${propBrackets.close}`;
    }

    return acc + whitespace + addText;
  });
}

interface KeyAndValueHandlerProps {
  restOfKeys: string;
  key: string;
  value: string;
}

function handleKeyAndValue(text: KeyAndValueHandlerProps) {
  const { restOfKeys, key, value } = text;
  const { clearedText, brackets } = removeBrackets(value);
  let result = `${key}=${brackets.open}${
    addCommas(clearedText)
  }${brackets.close}`;

  if (restOfKeys.length) {
    result = `${restOfKeys}=${result}`;
  }

  return result;
}

/**
 * add commas to a string with spaces
 */
function addCommas(text: string) {
  return text.includes(" ") ? `"${text}"` : text;
}

/**
 *  remove '{', '}', '[' and ']' of the text;
 */
function removeBrackets(text: string) {
  const brackets = {
    open: "",
    close: "",
  };

  const clearedText = text.replace(/(\{)|(\[)|(\])|(\})/g, (match) => {
    if (/(\{)|(\[)/g.test(match)) {
      brackets.open += match;
    }
    if (/(\])|(\})/g.test(match)) {
      brackets.close += match;
    }
    return "";
  });

  return { clearedText, brackets };
}

export default Body;
