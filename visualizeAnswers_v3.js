//visualize check answers based on text in JSON format
function visualize_answer(text) {

	function funcHighlight(event) {

		event.preventDefault(); // Prevent default link behavior if needed

		// Select the target element and set its background color
		let target = document.getElementById(event.currentTarget.className);
		target.style.backgroundColor = "yellow";
		target.scrollIntoView({ behavior: "smooth", block: "center" });

		setTimeout(function() {
			target.style.backgroundColor = "transparent";
		}, 1000);

		
	}
	
	const obj = JSON.parse(text);

	document.title = "Check Item " + obj.id;

	const element_ref = document.createElement("div");
	element_ref.style.display = "block";
	element_ref.style.backgroundColor = "#f1f1f1";
	element_ref.style.boxSizing = "border-box";
	element_ref.style.border = "2px solid #D3D3D3";
	element_ref.style.paddingTop = "0px";
	element_ref.style.paddingRight = "20px";
	element_ref.style.paddingBottom = "20px";
	element_ref.style.paddingLeft = "20px";
	var num_ref = 1;
	const para_ref_title = document.createElement("h2");
	const node_ref_title = document.createTextNode("References");
	para_ref_title.appendChild(node_ref_title);
	element_ref.appendChild(para_ref_title);

	var image_num = 0;

	//////////////
	//check item//
	//////////////
	const para_ci = document.createElement("h1");
	const node_ci = document.createTextNode("Check Item " + obj.id + ": " + obj.title);
	para_ci.appendChild(node_ci);
	document.body.appendChild(para_ci);
	
	//////////////////
	//check question//
	//////////////////
	if (obj.checkQuestion !== undefined) {

		const element_cq = document.createElement("div");
		element_cq.style.display = "block";
		element_cq.style.backgroundColor = "#f1f1f1";
		element_cq.style.boxSizing = "border-box";
		element_cq.style.border = "2px solid #D3D3D3";
		element_cq.style.paddingTop = "0px";
		element_cq.style.paddingRight = "20px";
		element_cq.style.paddingBottom = "10px";
		element_cq.style.paddingLeft = "20px";
		const para_cq_title = document.createElement("h2");
		const node_cq_title = document.createTextNode("Check Question");
		para_cq_title.appendChild(node_cq_title);
		element_cq.appendChild(para_cq_title);	

		let len_q = obj.checkQuestion.contents.length;
		let checkQuestionText = "";
		const para_cq = document.createElement("p");

		for (let i = 0; i < len_q; i++){
			if (obj.checkQuestion.contents[i].sentence !== undefined){
				checkQuestionText = obj.checkQuestion.contents[i].sentence;
				para_cq.innerHTML += checkQuestionText;
			} else if (obj.checkQuestion.contents[i].relevantMaterial !== undefined){
				var para_cq_a = document.createElement("a");
				para_cq_a.href = obj.checkQuestion.contents[i].relevantMaterial.location;
				var para_cq_a_text = document.createTextNode(obj.checkQuestion.contents[i].relevantMaterial.text);
				para_cq_a.appendChild(para_cq_a_text);
				para_cq.appendChild(para_cq_a);
			} else if (obj.checkQuestion.contents[i].image !== undefined) {
				//add image
				var image = document.createElement("img");
				image.style.display = "block";
				image.style.margin = "auto";
				image.src = obj.checkQuestion.contents[i].image.location;
				var linebreak = document.createElement("BR");
				para_cq.appendChild(linebreak);
				para_cq.appendChild(image);
				//add caption
				var caption = document.createElement("p");
				caption.style.textAlign = "center";
				image_num += 1;
				var caption_txt = document.createTextNode("Figure " + image_num.toString() + ". " + obj.checkQuestion.contents[i].image.caption + " ");
				caption.appendChild(caption_txt);
				para_cq.appendChild(caption);
				//add reference
				if (obj.checkQuestion.contents[i].image.reference !== undefined){
					var reference_list = element_ref.children;
					var exist = false;
					for (let j = 0; j < reference_list.length; j++){
						var reference_txt = obj.checkQuestion.contents[i].image.reference.author+" ("
							+obj.checkQuestion.contents[i].image.reference.year+"). "
							+obj.checkQuestion.contents[i].image.reference.title;
						if (reference_list[j].firstChild.nodeValue === reference_txt){
							exist = true;
							var para_img_a = document.createElement("a");
							para_img_a.className = j.toString();
							para_img_a.addEventListener("click", funcHighlight);
							para_img_a.href = "#"+j.toString();
							var node_img_a = document.createTextNode(" ("+obj.checkQuestion.contents[i].image.reference.author+", "+obj.checkQuestion.contents[i].image.reference.year+")")
							para_img_a.appendChild(node_img_a);
							caption.appendChild(para_img_a);
							break;
						}
					}

					if (!exist){
						var para_ref = document.createElement("a");
						para_ref.id = num_ref.toString();
						para_ref.href = obj.checkQuestion.contents[i].image.reference.url;
						var node_ref = document.createTextNode(obj.checkQuestion.contents[i].image.reference.author+" ("
							+obj.checkQuestion.contents[i].image.reference.year+"). "
							+obj.checkQuestion.contents[i].image.reference.title);
						para_ref.appendChild(node_ref);
						var linebreak = document.createElement("BR");
						para_ref.appendChild(linebreak);
					
						element_ref.appendChild(para_ref);

						var para_img_a = document.createElement("a");
						para_img_a.className = num_ref.toString();
						para_img_a.addEventListener("click", funcHighlight);
						para_img_a.href = "#"+num_ref.toString();
						var node_img_a = document.createTextNode(" ("+obj.checkQuestion.contents[i].image.reference.author+", "+obj.checkQuestion.contents[i].image.reference.year+")")
						num_ref += 1;
						para_img_a.appendChild(node_img_a);
						caption.appendChild(para_img_a);
					}
				}
			}
		}

		element_cq.appendChild(para_cq);
		document.body.appendChild(element_cq);
	}

	/////////////
	//rationale//
	/////////////
	if (obj.rationale !== undefined) {

		const element_r = document.createElement("div");
		element_r.style.display = "block";
		element_r.style.backgroundColor = "#f1f1f1";
		element_r.style.boxSizing = "border-box";
		element_r.style.border = "2px solid #D3D3D3";
		element_r.style.paddingTop = "0px";
		element_r.style.paddingRight = "20px";
		element_r.style.paddingBottom = "10px";
		element_r.style.paddingLeft = "20px";
		const para_r_title = document.createElement("h2");
		const node_r_title = document.createTextNode("Purpose");
		para_r_title.appendChild(node_r_title);
		element_r.appendChild(para_r_title);

		let len = obj.rationale.contents.length;
		let rationaleText = "";
		const para_r = document.createElement("p");

		for (let i = 0; i < len; i++) {
			const para_r_inner = document.createElement("p");
			para_r_inner.style.display = "inline";

			if (obj.rationale.contents[i].sentence !== undefined){
				rationaleText = obj.rationale.contents[i].sentence + " ";
				para_r_inner.innerHTML += rationaleText;

				if (obj.rationale.contents[i].reference !== undefined){
					var para_ref = document.createElement("a");
					para_ref.id = num_ref.toString();
					para_ref.href = obj.rationale.contents[i].reference.url;
					var node_ref = document.createTextNode(obj.rationale.contents[i].reference.author+" ("
						+obj.rationale.contents[i].reference.year+"). "
						+obj.rationale.contents[i].reference.title);
					
					para_ref.appendChild(node_ref);
					var linebreak = document.createElement("BR");
					para_ref.appendChild(linebreak);
					
					element_ref.appendChild(para_ref);

					var para_r_a = document.createElement("a");
					para_r_a.className = num_ref.toString();
					para_r_a.addEventListener("click", funcHighlight);
					para_r_a.href = "#"+num_ref.toString();
					var node_r_a = document.createTextNode(" ("+obj.rationale.contents[i].reference.author+", "+obj.rationale.contents[i].reference.year+")")
					num_ref += 1;
					para_r_a.appendChild(node_r_a);
					para_r_inner.appendChild(para_r_a);
				}
			} else if (obj.rationale.contents[i].relevantMaterial !== undefined){
				var para_r_a = document.createElement("a");
				para_r_a.href = obj.rationale.contents[i].relevantMaterial.location;
				var para_r_a_text = document.createTextNode(obj.rationale.contents[i].relevantMaterial.text);
				para_r_a.appendChild(para_r_a_text);
				para_r_inner.appendChild(para_r_a);
			}
			para_r.appendChild(para_r_inner);
		}
		element_r.appendChild(para_r);
		document.body.appendChild(element_r);
	}

	///////////////
	//instruction//
	///////////////
	if (obj.instruction !== undefined) {

		const element_i = document.createElement("div");
		element_i.style.display = "block";
		element_i.style.backgroundColor = "#f1f1f1";
		element_i.style.boxSizing = "border-box";
		element_i.style.border = "2px solid #D3D3D3";
		element_i.style.paddingTop = "0px";
		element_i.style.paddingRight = "20px";
		element_i.style.paddingBottom = "10px";
		element_i.style.paddingLeft = "20px";
		const para_i_title = document.createElement("h2");
		const node_i_title = document.createTextNode("Check Points");
		para_i_title.appendChild(node_i_title);
		element_i.appendChild(para_i_title);

		//contents loop
		let len_i = obj.instruction.contents.length;
		let instructionText = "";
		const para_i = document.createElement("p");
		
		for (let i = 0; i < len_i; i++) {
			const para_i_inner = document.createElement("p");
			para_i_inner.style.display = "inline";
			if (obj.instruction.contents[i].sentence !== undefined){
				instructionText = obj.instruction.contents[i].sentence + " ";
				//var node_i = document.createTextNode(instructionText);
				//para_i.appendChild(node_i);
				para_i_inner.innerHTML += instructionText;

				if (obj.instruction.contents[i].reference !== undefined){
					var reference_list = element_ref.children;
					var exist = false;

					for (let j = 0; j < reference_list.length; j++){
						var reference_txt = obj.instruction.contents[i].reference.author+" ("
							+obj.instruction.contents[i].reference.year+"). "
							+obj.instruction.contents[i].reference.title;
						if (reference_list[j].firstChild.nodeValue === reference_txt){
							exist = true;
							var para_i_a = document.createElement("a");
							para_i_a.className = j.toString();
							para_i_a.addEventListener("click", funcHighlight);
							para_i_a.href = "#"+j.toString();
							var node_i_a = document.createTextNode(" ("+obj.instruction.contents[i].reference.author+", "+obj.instruction.contents[i].reference.year+")")
							para_i_a.appendChild(node_i_a);
							para_i_inner.appendChild(para_i_a);
							break;
						}
					}

					if (!exist){
						var para_ref = document.createElement("a");
						para_ref.id = num_ref.toString();
						para_ref.href = obj.instruction.contents[i].reference.url;
						var node_ref = document.createTextNode(obj.instruction.contents[i].reference.author+" ("
							+obj.instruction.contents[i].reference.year+"). "
							+obj.instruction.contents[i].reference.title);

						para_ref.appendChild(node_ref);
						var linebreak = document.createElement("BR");
						para_ref.appendChild(linebreak);
					
						element_ref.appendChild(para_ref);

						var para_i_a = document.createElement("a");
						para_i_a.className = num_ref.toString();
						para_i_a.addEventListener("click", funcHighlight);
						para_i_a.href = "#"+num_ref.toString();
						var node_i_a = document.createTextNode(" ("+obj.instruction.contents[i].reference.author+", "+obj.instruction.contents[i].reference.year+")")
						num_ref += 1;
						para_i_a.appendChild(node_i_a);
						para_i_inner.appendChild(para_i_a);
					}
				}

			} else if (obj.instruction.contents[i].image !== undefined) {
				//add image
				var image = document.createElement("img");
				image.style.display = "block";
				image.style.margin = "auto";
				image.src = obj.instruction.contents[i].image.location;
				var linebreak = document.createElement("BR");
				para_i_inner.appendChild(linebreak);
				para_i_inner.appendChild(image);
				//add caption
				var caption = document.createElement("p");
				caption.style.textAlign  = "center";
				image_num += 1;
				var caption_txt = document.createTextNode("Figure " + image_num.toString() + ". " + obj.instruction.contents[i].image.caption + " ");
				caption.appendChild(caption_txt);
				para_i_inner.appendChild(caption);
				//add reference
				if (obj.instruction.contents[i].image.reference !== undefined){
					var reference_list = element_ref.children;
					var exist = false;
					for (let j = 0; j < reference_list.length; j++){
						var reference_txt = obj.instruction.contents[i].image.reference.author+" ("
							+obj.instruction.contents[i].image.reference.year+"). "
							+obj.instruction.contents[i].image.reference.title;
						if (reference_list[j].firstChild.nodeValue === reference_txt){
							exist = true;
							var para_img_a = document.createElement("a");
							para_img_a.className = j.toString();
							para_img_a.addEventListener("click", funcHighlight);
							para_img_a.href = "#"+j.toString();
							var node_img_a = document.createTextNode(" ("+obj.instruction.contents[i].image.reference.author+", "+obj.instruction.contents[i].image.reference.year+")")
							para_img_a.appendChild(node_img_a);
							caption.appendChild(para_img_a);
							break;
						}
					}

					if (!exist){
						var para_ref = document.createElement("a");
						para_ref.id = num_ref.toString();
						para_ref.href = obj.instruction.contents[i].image.reference.url;
						var node_ref = document.createTextNode(obj.instruction.contents[i].image.reference.author+" ("
							+obj.instruction.contents[i].image.reference.year+"). "
							+obj.instruction.contents[i].image.reference.title);
						para_ref.appendChild(node_ref);
						var linebreak = document.createElement("BR");
						para_ref.appendChild(linebreak);
					
						element_ref.appendChild(para_ref);

						var para_img_a = document.createElement("a");
						para_img_a.className = num_ref.toString();
						para_img_a.addEventListener("click", funcHighlight);
						para_img_a.href = "#"+num_ref.toString();
						var node_img_a = document.createTextNode(" ("+obj.instruction.contents[i].image.reference.author+", "+obj.instruction.contents[i].image.reference.year+")")
						num_ref += 1;
						para_img_a.appendChild(node_img_a);
						caption.appendChild(para_img_a);
					}
				}

			} else if (obj.instruction.contents[i].relevantMaterial !== undefined){
				var para_i_a = document.createElement("a");
				para_i_a.href = obj.instruction.contents[i].relevantMaterial.location;
				var para_i_a_text = document.createTextNode(obj.instruction.contents[i].relevantMaterial.text);
				para_i_a.appendChild(para_i_a_text);
				para_i_inner.appendChild(para_i_a);

			} else if (obj.instruction.contents[i].relevantCheckItems !== undefined){
				var div = document.createElement("p");
				var checkItems = obj.instruction.contents[i].relevantCheckItems;

				for (let j = 0; j < checkItems.length; j++) {
					var itemName = checkItems[j].ID;
					var section = itemName.split("-")[0];

					var para_p = document.createElement("p");

					var para = document.createElement("a");
					para.href = "../../"+section + "/" + itemName + "/" + itemName + ".html";
					var node = document.createTextNode("Check item "+itemName+" ("+checkItems[j].Description+")");
					para.appendChild(node);

					para_p.appendChild(para);
					para_i_inner.appendChild(para_p);
				}
				element_i.appendChild(div);
			}
			para_i.appendChild(para_i_inner);
		}

		element_i.appendChild(para_i);

		document.body.appendChild(element_i);
	}

	////////////////////////
	//inspection equipment//
	////////////////////////
	const div_ie = document.createElement("div");
	div_ie.style.display = "block";
	div_ie.style.backgroundColor = "#f1f1f1";
	div_ie.style.boxSizing = "border-box";
	div_ie.style.border = "2px solid #D3D3D3";
	div_ie.style.paddingTop = "0px";
	div_ie.style.paddingRight = "20px";
	div_ie.style.paddingBottom = "10px";
	div_ie.style.paddingLeft = "20px";
	const para_ie_title = document.createElement("h2");
	const node_ie_title = document.createTextNode("Inspection Equipment");
	para_ie_title.appendChild(node_ie_title);
	div_ie.appendChild(para_ie_title);
	const para_ie = document.createElement("p");
	const node_ie = document.createTextNode("(The required inspection equipment will be specified at a later time.)");
	para_ie.appendChild(node_ie);
	div_ie.appendChild(para_ie);
	document.body.appendChild(div_ie);


	/////////////
	//reference//
	/////////////
	if (element_ref.children.length !== 1) {
		document.body.appendChild(element_ref);
	}
	
	
	
}