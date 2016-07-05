

function fillInput(){
	$('#test').val('testing');
	$('#test').trigger('change');
	$('#test').blur();
	alert('fillInput completed');
}

fillInput();