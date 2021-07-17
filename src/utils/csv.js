import PapaParse from "papaparse";

export const importCSV = (event, callback) => {
  const files = event.target.files;
  let reader = new FileReader();

  const onError = (error) => { 
    console.log("error", error) 
  }

  if (files.length > 0) {
    const fileInfo = {
      name: files[0].name,
      size: files[0].size,
      type: files[0].type,
    }
    
    const fileEncoding = "UTF-8"
    
    const parserOptions = {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      transformHeader: header =>
        header
          .replace(/\W/g, '_')
    }

    reader.onload = (event) => {
      const csvData = PapaParse.parse(
        reader.result,
        Object.assign(parserOptions, {
          error: onError,
          encoding: fileEncoding,
        }),
      )
      // setAttendees(csvData.data);
      const data = csvData.data;
      callback(csvData.data);
    }
    reader.readAsText(files[0], fileEncoding);
  }
}