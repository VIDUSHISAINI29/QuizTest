<!-- <script setup>
import { reader } from "xlsx";
const file = reader.readFile('@/DataFile/StudentsData.xlsx');
let data = [];
const sheets = file.sheetNames;
for(i = 0; i < sheets.length; i++){
   const temp =  reader.utils.sheet_to_json(
      file.Sheets[file.SheetNames[i]]
   )
   temp.forEach(res => {
      data.push(res)
   });
}
console.log('data = ', data);

</script>

<template>
<div>
   <span>hello i am here!
   </span>
</div>
</template>

<style scoped></style> -->

<script setup>
import * as XLSX from "xlsx";
import { reactive, ref, watch } from "vue";

const data = ref([]);
const dataStatus = ref(false);
const checkBoxArray = ref([]);

async function handleFileUpload(event) {
   const file = await event.target.files[0];
   if (file) {
      const reader = await new FileReader();
      reader.onload = (e) => {
         const binaryStr = e.target.result;
         const workbook = XLSX.read(binaryStr, { type: "binary" });

         // Extract data from all sheets
         const sheetNames = workbook.SheetNames;

         const allData = [];
         sheetNames.forEach((sheetName) => {
            const sheetData = XLSX.utils.sheet_to_json(
               workbook.Sheets[sheetName],
            );
            allData.push(sheetData);
         });
         data.value = allData.flat();
         dataStatus.value = true
         console.log("data =", data.value);
         console.log("length = ", data.value.length);
      };
      reader.readAsBinaryString(file);
   
   }
}

function printCheckBox() {
   for (let i = 0; i < data.value.length; i++) {
      console.log("value1 = ", checkBoxArray.value[i].one);
      console.log("value2 = ", checkBoxArray.value[i].two);
      console.log("value3 = ", checkBoxArray.value[i].three);
      console.log("value4 = ", checkBoxArray.value[i].four);
   }
   printCheckBox();
 
}
watch(data, () => {
      console.log('hello data entered');
      if(data.value.length > 1){
      for(let i = 0; i < data.value.length; i++){
       checkBoxArray.value.push({
      one:'1',
      two:'',
      three:'',
      four:''
   })
   printCheckBox
}
console.log(' real value = ', checkBoxArray.value[0].one);
     }
      
   });
</script>

<template>
   <div class="">
      <div
         class="tw-flex tw-w-full tw-items-center tw-justify-center tw-bg-pink-500 tw-p-3">
         <input type="file" @change="handleFileUpload" />
      </div>
      <div
         class="tw-flex tw-w-full tw-flex-col tw-items-center tw-gap-3 tw-p-1">
         <span v-if="dataStatus" class="tw-font-semibold tw-text-xl">Quiz is Ready</span>
         <div v-for="(col, index) in data" class="tw-rounded-lg tw-shadow-md">
            <div
               class="tw-w-96 tw-overflow-hidden tw-rounded-lg tw-border-b-[6px] tw-border-r-[6px] tw-border-blue-900 tw-bg-blue-200 tw-p-2">
               <span class="tw-block">
                  Question{{ [index + 1] + ": " + " " + col.Questions }}
               </span>
               <div class="tw-flex tw-items-center tw-gap-1 tw-text-sm">
                  <input
                     class="tw-h-[14px] tw-w-[14px]"
                     v-model="checkBoxArray[index].one"
                     type="checkbox" />
                  <span class="tw-block">{{ col.Option1 }}</span>
               </div>
               <div class="tw-flex tw-items-center tw-gap-1 tw-text-sm">
                  <input
                     class="tw-h-[14px] tw-w-[14px]"
                     v-model="checkBoxArray[index].two"
                     type="checkbox" />
                  <span class="tw-block">{{ col.Option2 }}</span>
               </div>
               <div class="tw-flex tw-items-center tw-gap-1 tw-text-sm">
                  <input
                     class="tw-h-[14px] tw-w-[14px]"
                     v-model="checkBoxArray[index].three"
                     type="checkbox" />
                  <span class="tw-block">{{ col.Option3 }}</span>
               </div>
               <div class="tw-flex tw-items-center tw-gap-1 tw-text-sm">
                  <input
                     class="tw-h-[14px] tw-w-[14px]"
                     v-model="checkBoxArray[index].four"
                     type="checkbox" />
                  <span class="tw-block">{{ col.Option4 }}</span>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
