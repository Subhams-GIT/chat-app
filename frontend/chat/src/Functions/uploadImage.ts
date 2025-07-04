import api from "@/lib/axios";

async function upload(e:React.ChangeEvent<HTMLInputElement>){
	e.preventDefault();
	const file = e.target.files?.[0];
	api.post('/upload',()=>{
		file:file
	}).then(data=>{
		
	})
}