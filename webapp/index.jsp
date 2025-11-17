<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="org.example.webb.model.Point" %>
<%@ page import="java.util.List" %>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Лабораторная работа №2</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/style/main.css">

    <script defer src="${pageContext.request.contextPath}/index.js"></script>
    <script defer src="${pageContext.request.contextPath}/canvas.js"></script>
</head>
<body>

<div class="header">
    <h2>Выполнила: Хакимова Сафина Рамисовна</h2>
    <h3>Группа: P3222</h3>
    <h3>Вариант: 59501</h3>
</div>

<div class="main-content">
    <div class="graph-section">
        <h2>Область попадания</h2>
        <div class="graph">
            <canvas id="graphCanvas" width="400" height="400" style="border:1px solid #ccc; background:#fdfdfd;"></canvas>
        </div>
    </div>

    <div class="form-section">
        <h2>Параметры точки</h2>

        <form id="valForm" method="post" action="${pageContext.request.contextPath}/controller" class="input-form">
            <div id="error-container" style="display: none;"></div>


            <div class="form-group">
                <label>Координата X :</label>
                <div class="x-buttons">
                    <c:forEach var="i" items="${[-5,-4,-3,-2,-1,0,1,2,3]}">
                        <button type="button" class="x-btn" data-value="${i}">${i}</button>
                    </c:forEach>
                </div>
                <input type="hidden" id="x" name="x">
            </div>


            <div class="form-group">
                <label for="yInput">Координата Y (от -5 до 5):</label>
                <input type="text" id="yInput" name="y" placeholder="например 1.5">
            </div>


            <div class="form-group">
                <label>Радиус R :</label>
                <div class="r-checkboxes">
                    <c:forEach var="rVal" items="${[1,2,3,4,5]}">
                        <label><input type="checkbox" name="r" value="${rVal}">${rVal}</label>
                    </c:forEach>
                </div>
                <input type="hidden" id="r" name="r">
            </div>

            <div class="buttons">
                <input type="submit" value="Проверить">
                <input type="reset" value="Сбросить" id="formReset">
            </div>

        </form>

        <div class="results-link" style="text-align:center; margin-top:18px;">
            <a href="${pageContext.request.contextPath}/controller">Посмотреть результаты</a>

        </div>

    </div>

    <div class="results-section" style="margin-top: 30px;">
        <h2>История всех проверок</h2>
        <table class="results-table">
            <thead>
            <tr>
                <th>X</th>
                <th>Y</th>
                <th>R</th>
                <th>Результат</th>
                <th>Время запроса</th>
                <th>Время работы (мс)</th>
            </tr>
            </thead>
            <tbody>
            <c:choose>
                <c:when test="${empty applicationScope.results}">
                    <tr><td colspan="6">Нет данных</td></tr>
                </c:when>
                <c:otherwise>
                    <c:set var="reversedResults" value="${applicationScope.results}" />
                    <c:forEach var="i" begin="0" end="${reversedResults.size() - 1}">
                        <c:set var="p" value="${reversedResults[reversedResults.size() - 1 - i]}" />
                        <tr>
                            <td>${p.x}</td>
                            <td>${p.y}</td>
                            <td>${p.r}</td>
                            <td class="${p.hit ? 'hit' : 'miss'}">
                                <c:out value="${p.hit ? 'Попадание' : 'Промах'}"/>
                            </td>
                            <td>${p.timestamp}</td>
                            <td>${p.workTime}</td>
                        </tr>
                    </c:forEach>
                </c:otherwise>
            </c:choose>
            </tbody>
        </table>
    </div>
<script>
    const historyPoints = [
        <c:forEach var="p" items="${applicationScope.results}">
        {x: ${p.x}, y: ${p.y}, r: ${p.r}, hit: ${p.hit}},
        </c:forEach>
    ];
</script>
</div>

</body>
</html>
