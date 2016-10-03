/*
 * This code will move the data from sc_req_item to task
 */
var tableOne = {
    table: 'sc_req_item',
    columnToMove: 'u_project_request',
    columnToAccept: 'u_project'
};
var sc_req_item = new GlideRecord(tableOne.table);
sc_req_item.addEncodedQuery(tableOne.columnToMove + 'ISNOTEMPTY');
sc_req_item.query();
while(sc_req_item.next()){
    sc_req_item[tableOne.columnToAccept] = sc_req_item[tableOne.columnToMove];
    sc_req_item.autoSysFields(false);//don't show it was updated
    sc_req_item.setWorkflow(false);//don't fire updates/emails etc
    sc_req_item.update();
}
