<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Todos</title>
</head>
<body>
	<h1>Todos</h1>
	<div id="content">
	</div>

	<script type="text/template" id="tmpl_todo_list">
		<button class="newTodo">Nouveau</button>
		<ul>
		</ul>
	</script>

	<script type="text/template" id="tmpl_todo">
		<% if(editing == true) { %>
			<input type="text" class="label" value="<%= label %>"/>
		<% } else { %>
			<input type="checkbox" class="done" <% if(done == 1) { %>checked<% } %> />
			<% if(done == 1) { %>
				<s><%= label %></s>
			<% } else { %>
				<%= label %>
			<% } %>
			<button class="delete">Supprimer</button>
			<button class="edit">Modifier</button>
		<% } %>
	</script>

	<script type="text/javascript" src="js/jquery-1.10.2.min.js"></script>
	<script type="text/javascript" src="js/lodash.min.js"></script>
	<script type="text/javascript" src="js/backbone-min.js"></script>
	<script type="text/javascript" src="js/app.js"></script>
</body>
</html>
