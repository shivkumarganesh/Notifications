describe("Native Notification Test",function(){
	it("Gets Permission",function(){
		var notify = new Notify();
		expect(notify._getPermission()).toEqual("granted");
	});
});