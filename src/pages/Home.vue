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
import { check } from "prettier";

const data = ref([]);
const dataStatus = ref(false);
const checkBoxArray = ref([]);
const submitStatus = ref(false)

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
         checkBoxArray.value = Array(data.value.length).fill(null);
         dataStatus.value = true
         console.log("data =", data.value);
         console.log("length = ", data.value.length);
      };
      reader.readAsBinaryString(file);
   
   }
}

function checkAnswers(option){
   for(let i = 0; i < data.value.length; i++){
      console.log('checkbox array = ', checkBoxArray.value);
   }
   console.log('data inside checking = ',data)
}

// watch(checkBoxArray, () => {
//    printBox();
// })

 
   
</script>

<template>
   <div class="tw-flex tw-flex-col tw-w-full tw-items-center">
      <div
         class="tw-flex tw-w-full tw-items-center tw-justify-center tw-bg-pink-500 tw-p-3">
         <input type="file" @change="handleFileUpload" />
      </div>
      <div v-if="dataStatus"
         class="tw-flex tw-w-full tw-flex-col tw-items-center tw-gap-3 tw-p-1">
         <span v-if="!submitStatus"  class="tw-font-semibold tw-text-xl">Quiz is Ready</span>
         <div v-if="!submitStatus" v-for="(col, index) in data" class="tw-rounded-lg tw-shadow-md">
            <div
               class="tw-w-96 tw-overflow-hidden tw-rounded-lg tw-border-b-[6px] tw-border-r-[6px] tw-border-blue-900 tw-bg-blue-200 tw-p-2">
               <span class="tw-block">
                  Question{{ [index + 1] + ": " + " " + col.Questions }}
               </span>
               <div class="tw-flex tw-items-center tw-gap-1 tw-text-sm">
                  <input
                     class="tw-h-[14px] tw-cursor-pointer tw-w-[14px]"
                     
                     :name="'question-' + index"
                     v-model="checkBoxArray[index]"
                     @change="checkAnswers('1')"
                     type="radio" />
                  <span class="tw-block">{{ col.Option1 }}</span>
               </div>
               <div class="tw-flex tw-items-center tw-gap-1 tw-text-sm">
                  <input
                     class="tw-h-[14px] tw-cursor-pointer tw-w-[14px]"
                     :name="'question-' + index"
                     v-model="checkBoxArray[index]"
                     @change="checkAnswers('2')"
                     type="radio" />
                  <span class="tw-block">{{ col.Option2 }}</span>
               </div>
               <div class="tw-flex tw-items-center tw-gap-1 tw-text-sm">
                  <input
                     class="tw-h-[14px] tw-cursor-pointer tw-w-[14px]"
                     :name="'question-' + index"
                     v-model="checkBoxArray[index]"
                     @change="checkAnswers('3')"
                     type="radio" />
                  <span class="tw-block">{{ col.Option3 }}</span>
               </div>
               <div class="tw-flex tw-items-center tw-gap-1 tw-text-sm">
                  <input
                     class="tw-h-[14px] tw-cursor-pointer tw-w-[14px]"
                     @click="printBox"
                     :name="'question-' + index"
                     v-model="checkBoxArray[index]"
                     @change="checkAnswers('4')"
                     type="radio" />
                  <span class="tw-block">{{ col.Option4 }}</span>
               </div>
            </div>
         </div>
         <span v-if="!submitStatus" @click="submitStatus = true"  class="tw-bg-blue-900 tw-cursor-pointer tw-text-white tw-p-2 tw-rounded-lg">Submit</span>

      </div>
     <div class=" tw-flex tw-flex-col tw-gap-2">
      <span class="tw-bg-blue-900 tw-block tw-w-80 tw-cursor-pointer tw-text-white tw-p-2 tw-rounded-lg">Your response is successfully recorded.</span>
      <span class="tw-bg-blue-900 tw-text-center tw-block tw-w-80 tw-cursor-pointer tw-text-white tw-p-2 tw-rounded-lg">Check Answers</span>
     </div>

   </div>
</template>
