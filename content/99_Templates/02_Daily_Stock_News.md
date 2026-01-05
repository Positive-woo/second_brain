<%*
const folder = "02_Daily_Stock_News";
const fileName = tp.date.now("YYYY-MM-DD");
await tp.file.move(`${folder}/${fileName}`);
%>
```markdown
작성 일자 : <% tp.date.now() %>
```

