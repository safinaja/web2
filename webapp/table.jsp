<%@ page import="org.example.webb.model.Point" %>
<%@ page import="java.util.List" %>
<%@ page contentType="text/html;charset=UTF-8" %>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Последняя проверка</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/style/main.css">
</head>
<body>
<div class="container">
    <h2>Последняя проверка</h2>

    <%
        List<Point> results = (List<Point>) application.getAttribute("results");
        Point lastPoint = null;
        if (results != null && !results.isEmpty()) {
            lastPoint = results.get(results.size() - 1);
        }
    %>

    <table class="results-table">
        <thead>
        <tr>
            <th>X</th>
            <th>Y</th>
            <th>R</th>
            <th>Результат</th>
            <th>Время</th>
            <th>Время работы (мс)</th>
        </tr>
        </thead>
        <tbody>
        <% if (lastPoint != null) { %>
        <tr>
            <td><%= lastPoint.getX() %></td>
            <td><%= lastPoint.getY() %></td>
            <td><%= lastPoint.getR() %></td>
            <td class="<%= lastPoint.isHit() ? "hit" : "miss" %>">
                <%= lastPoint.isHit() ? "Попадание" : "Промах" %>
            </td>
            <td><%= lastPoint.getTimestamp() %></td>
            <td><%= lastPoint.getWorkTime() %></td>
        </tr>
        <% } else { %>
        <tr><td colspan="6">Нет данных</td></tr>
        <% } %>
        </tbody>
    </table>

    <a href="index.jsp" class="back-link">Вернуться на главную</a>
</div>
</body>
</html>
