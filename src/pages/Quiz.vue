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
const selectedOptionsArray = ref([]);
const submitStatus = ref(false);
const showAnswers = ref(false);
const correctAnswers = ref(0);
const incorrectAnswers = ref(0);
const showQuestions = ref(true);

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
         selectedOptionsArray.value = Array(data.value.length).fill(null);
         dataStatus.value = true;
         console.log("data =", data.value);
         // console.log("length = ", data.value.length);
      };
      reader.readAsBinaryString(file);
   }
}

function storeAnswers(option, questionNumber) {
   selectedOptionsArray.value[questionNumber - 1] = option;
   // console.log('checkbox array = ', selectedOptionsArray.value);
}

function checkAnswers() {
   if (showAnswers.value === false) {
      for (let i = 0; i < data.value.length; i++) {
         if (data.value[i].CorrectOption === selectedOptionsArray.value[i]) {
            correctAnswers.value++;
         } else {
            incorrectAnswers.value++;
         }
      }
   }

   console.log("correct answers = ", correctAnswers);
   console.log("Incorrect answers = ", incorrectAnswers);
   showAnswers.value = true;
   submitStatus.value = false;
}
function changeSubmitStatus(){
   submitStatus.value = true;
   showQuestions.value = false;
   console.log('submit statues',submitStatus);
   
}
// watch(checkBoxArray, () => {
//    printBox();
// })
</script>

<template>
   <div class="tw-flex tw-w-full tw-flex-col tw-items-center">
      <div
         class="tw-flex tw-w-full tw-items-center tw-justify-center tw-gap-2 tw-bg-blue-900 tw-p-3 tw-text-white">
         <span>Upload File for questions :</span>
         <input type="file" @change="handleFileUpload" />
      </div>
      <div
         v-if="dataStatus"
         class="tw-flex tw-w-full tw-flex-col tw-items-center tw-gap-3 tw-p-1">
         <span v-if="showQuestions" class="tw-text-xl tw-font-semibold">
            Quiz is Ready
         </span>
         <div
            v-if="showQuestions"
            v-for="(col, index) in data"
            class="tw-rounded-lg tw-shadow-md tw-transition tw-duration-500">
            <div
               class="tw-w-96 tw-overflow-hidden tw-rounded-lg tw-border-b-[6px] tw-border-r-[6px] tw-border-blue-900 tw-bg-blue-200 tw-p-2">
               <span class="tw-block">
                  Question{{ [index + 1] + ": " + " " + col.Questions }}
               </span>
               <div class="tw-flex tw-items-center tw-gap-1 tw-text-sm">
                  <input
                     class="tw-h-[14px] tw-w-[14px] tw-cursor-pointer"
                     :name="'question-' + index"
                     v-model="checkBoxArray[index]"
                     @change="storeAnswers(1, index + 1)"
                     type="radio" />
                  <span class="tw-block">{{ col.Option1 }}</span>
               </div>
               <div class="tw-flex tw-items-center tw-gap-1 tw-text-sm">
                  <input
                     class="tw-h-[14px] tw-w-[14px] tw-cursor-pointer"
                     :name="'question-' + index"
                     v-model="checkBoxArray[index]"
                     @change="storeAnswers(2, index + 1)"
                     type="radio" />
                  <span class="tw-block">{{ col.Option2 }}</span>
               </div>
               <div class="tw-flex tw-items-center tw-gap-1 tw-text-sm">
                  <input
                     class="tw-h-[14px] tw-w-[14px] tw-cursor-pointer"
                     :name="'question-' + index"
                     v-model="checkBoxArray[index]"
                     @change="storeAnswers(3, index + 1)"
                     type="radio" />
                  <span class="tw-block">{{ col.Option3 }}</span>
               </div>
               <div class="tw-flex tw-items-center tw-gap-1 tw-text-sm">
                  <input
                     class="tw-h-[14px] tw-w-[14px] tw-cursor-pointer"
                     @click="printBox"
                     :name="'question-' + index"
                     v-model="checkBoxArray[index]"
                     @change="storeAnswers(4, index + 1)"
                     type="radio" />
                  <span class="tw-block">{{ col.Option4 }}</span>
               </div>
            </div>
         </div>
         <span
            @click="changeSubmitStatus"
            v-if="showQuestions"
            class="tw-cursor-pointer tw-rounded-lg tw-bg-blue-900 tw-p-2 tw-text-white">
            Submit
         </span>
      </div>
      <div v-if="submitStatus" class="tw-flex tw-items-center tw-flex-col tw-gap-2">
         <span
            class="tw-block tw-w-80 tw-cursor-pointer tw-rounded-lg tw-bg-blue-900 tw-p-2 tw-text-white">
            Your response is successfully recorded.
         </span>
         <span
            @click="checkAnswers"
            class="tw-block tw-w-80 tw-cursor-pointer tw-rounded-lg tw-bg-blue-900 tw-p-2 tw-text-center tw-text-white">
            Check Answers
         </span>
        
      </div>
      <div v-if="showAnswers" class="tw-flex tw-my-10 tw-items-center tw-flex-col tw-gap-2">
            <div>
               <span
                  class="tw-block tw-w-80 tw-cursor-pointer tw-rounded-lg tw-bg-blue-900 tw-p-2 tw-text-white">
                  Correct Answers : {{ correctAnswers }}
               </span>
            </div>
            <div>
               <span
                  class="tw-block tw-w-80 tw-cursor-pointer tw-rounded-lg tw-bg-blue-900 tw-p-2 tw-text-white">
                  InCorrect Answers : {{ incorrectAnswers }}
               </span>
            </div>

            <div v-for="(col, index) in data" class="">
               <div
               class="tw-w-96 tw-overflow-hidden tw-rounded-lg tw-border-b-[6px] tw-border-r-[6px] tw-border-blue-900 tw-flex tw-flex-col tw-bg-blue-200 tw-p-2">
               <span class="tw-block">
                  Question{{ [index + 1] + ": " + " " + col.Questions }}
               </span>
               <span class="tw-block">
                  Correct Answer : {{ col.CorrectAnswer }}
               </span>
            </div>
            </div>
          
         </div>
   </div>
</template>
