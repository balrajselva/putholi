<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Puthuyir Team</title>

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

    <link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>


    <!-- use the font -->
    <style>
        body {
            font-family: "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
            font-size: 14px;
        }
        .table {
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
}

.table th,
.table td {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}

.table thead th {
  vertical-align: bottom;
  border-bottom: 2px solid #dee2e6;
}

.table tbody + tbody {
  border-top: 2px solid #dee2e6;
}

.table-sm th,
.table-sm td {
  padding: 0.3rem;
}

.table-bordered {
  border: 1px solid #dee2e6;
}

.table-bordered th,
.table-bordered td {
  border: 1px solid #dee2e6;
}

.table-bordered thead th,
.table-bordered thead td {
  border-bottom-width: 2px;
}

.table-borderless th,
.table-borderless td,
.table-borderless thead th,
.table-borderless tbody + tbody {
  border: 0;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}

.table-hover tbody tr:hover {
  color: #212529;
  background-color: rgba(0, 0, 0, 0.075);
}

.table-primary,
.table-primary > th,
.table-primary > td {
  background-color: #b8daff;
}

.table-primary th,
.table-primary td,
.table-primary thead th,
.table-primary tbody + tbody {
  border-color: #7abaff;
}

.table-hover .table-primary:hover {
  background-color: #9fcdff;
}

.table-hover .table-primary:hover > td,
.table-hover .table-primary:hover > th {
  background-color: #9fcdff;
}

.table-secondary,
.table-secondary > th,
.table-secondary > td {
  background-color: #d6d8db;
}


    </style>
</head>
<body style="margin: 0; padding: 0;">

Dear DEO ,

 <p> Please find the below school name and requirements details.
 Kindly approve to fullfill the requirement from school </p>

 <p> School Details </p>


 <table class="table table-bordered table-striped">
   <thead>
   <tr>
   <th>School Name</th>
   <th>School Registered No</th>
   <th>School Type</th>
   </thead>

   <tbody>
     <tr>
     <td>${schoolName} </td>
      <td>${schoolRegNo} </td>
      <td>${schoolType} </td>
     </tr>
     </body>
     </table>

<p>Requirements Details: </p>


   <table class="table table-bordered table-striped">
   <thead>
   <tr>
   <th>Requirement Type</th>
   <th>Asset Type</th>
   <th>Asset Name</th>
   <th>Priority</th>
   <th>Quantity</th></tr>
   </thead>

   <tbody>
   <#list requirements as details>
   <tr>
  	<td>${details.reqType}</td>
  	<td>${details.assetType}</td>
 	<td>${details.assetName}</td>
 	<td>${details.priority}</td>
 	<td>${details.quantity}</td>
 	</tr>                                               
</#list>

    </tbody>
    </table>
</body>
</html>