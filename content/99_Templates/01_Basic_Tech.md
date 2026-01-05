<%*
const folder = "01_Tech";
const fileName = tp.date.now("YYYY-MM-DD");
await tp.file.move(`${folder}/${fileName}`);
%>

```markdown
작성 일자 : <% tp.date.now() %>
```

