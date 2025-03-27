<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="container mx-auto p-4 py-8 max-w-6xl">
      <h1 class="text-3xl font-bold mb-8 text-gray-800">News Article Editor</h1>

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <!-- Editor Section -->
        <div
          class="lg:col-span-3 bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <h2 class="text-xl font-semibold mb-6 pb-2 border-b">
            Crear nuevo articulo
          </h2>

          <!-- Banner Image Upload -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Banner Image</label
            >
            <div
              class="border-2 border-dashed border-gray-300 rounded-lg p-4 transition-all hover:border-blue-400 cursor-pointer"
              :class="{ 'border-blue-500 bg-blue-50': bannerPreview }"
              @click="triggerBannerUpload"
            >
              <input
                type="file"
                ref="bannerInput"
                class="hidden"
                accept="image/*"
                @change="handleBannerUpload"
              />

              <div v-if="!bannerPreview" class="text-center py-8">
                <div
                  class="mx-auto w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3"
                >
                  <ImageIcon class="w-6 h-6 text-blue-500" />
                </div>
                <p class="text-sm text-gray-600">
                  Click to upload banner image
                </p>
                <p class="text-xs text-gray-400 mt-1">
                  Recommended size: 1200 x 600px
                </p>
              </div>

              <div v-else class="relative">
                <img
                  :src="bannerPreview"
                  alt="Banner preview"
                  class="w-full h-48 object-cover rounded-md"
                />
                <button
                  @click.stop="removeBanner"
                  class="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                >
                  <XIcon class="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>
          </div>

          <!-- Title Input -->
          <div class="mb-6">
            <label
              for="title"
              class="block text-sm font-medium text-gray-700 mb-2"
              >Title</label
            >
            <input
              id="title"
              v-model="article.title"
              type="text"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Enter a compelling title for your article"
            />
          </div>

          <!-- Category Selection -->
          <div class="mb-6">
            <label
              for="category"
              class="block text-sm font-medium text-gray-700 mb-2"
              >Category</label
            >
            <div class="relative">
              <select
                id="category"
                v-model="article.category"
                class="appearance-none w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white pr-10"
              >
                <option value="" disabled>Select a category</option>
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
              <div
                class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none"
              >
                <ChevronDownIcon class="w-5 h-5 text-gray-500" />
              </div>
            </div>
          </div>

          <!-- Rich Text Editor -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Content</label
            >
            <div class="border border-gray-300 rounded-lg overflow-hidden">
              <!-- Editor Toolbar -->
              <div class="bg-gray-50 p-2 border-b flex flex-wrap gap-1">
                <button
                  v-for="item in editorMenuItems"
                  :key="item.command"
                  @click="executeCommand(item.command)"
                  class="p-1.5 rounded hover:bg-gray-200 transition-colors"
                  :class="{
                    'bg-gray-200 text-blue-600': isActive(item.command),
                  }"
                  :title="item.title"
                >
                  <component :is="item.icon" class="w-4 h-4" />
                </button>

                <div class="h-6 w-px bg-gray-300 mx-1"></div>

                <label
                  class="p-1.5 rounded hover:bg-gray-200 transition-colors cursor-pointer"
                  title="Insert Image"
                >
                  <input
                    type="file"
                    accept="image/*"
                    class="hidden"
                    @change="insertImage"
                  />
                  <ImageIcon class="w-4 h-4" />
                </label>

                <button
                  @click="insertTable"
                  class="p-1.5 rounded hover:bg-gray-200 transition-colors"
                  title="Insert Table"
                >
                  <TableIcon class="w-4 h-4" />
                </button>
              </div>

              <!-- Editor Content -->
              <div
                ref="editorRef"
                class="p-4 min-h-[300px] focus:outline-none prose max-w-none"
                contenteditable="true"
                @input="updateContent"
              ></div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-3 justify-end">
            <button
              @click="previewArticle"
              class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Preview
            </button>
            <button
              @click="saveArticle"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <SaveIcon class="w-4 h-4" />
              Save Article
            </button>
          </div>
        </div>

        <!-- Preview Section -->
        <div
          class="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100 h-fit sticky top-4"
        >
          <h2
            class="text-xl font-semibold mb-6 pb-2 border-b flex items-center gap-2"
          >
            <EyeIcon class="w-5 h-5 text-gray-500" />
            Preview
          </h2>

          <div class="overflow-hidden rounded-lg border border-gray-200">
            <!-- Banner Preview -->
            <div v-if="bannerPreview" class="w-full h-48 bg-gray-100">
              <img
                :src="bannerPreview"
                alt="Banner preview"
                class="w-full h-full object-cover"
              />
            </div>
            <div
              v-else
              class="w-full h-32 bg-gray-100 flex items-center justify-center"
            >
              <p class="text-sm text-gray-400">Banner image will appear here</p>
            </div>

            <!-- Content Preview -->
            <div class="p-4">
              <div v-if="article.title" class="mb-3">
                <h3 class="text-2xl font-bold text-gray-800">
                  {{ article.title }}
                </h3>
              </div>
              <div v-else class="mb-3">
                <div class="h-8 bg-gray-100 rounded w-3/4"></div>
              </div>

              <div v-if="article.category" class="mb-4">
                <span
                  class="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full"
                >
                  {{ getCategoryName(article.category) }}
                </span>
              </div>

              <div class="prose max-w-none" v-html="article.content"></div>
              <div v-if="!article.content" class="text-gray-400 italic text-sm">
                Your article content will appear here...
              </div>
            </div>
          </div>

          <div class="mt-6 text-sm text-gray-500">
            <p class="flex items-center gap-1">
              <InfoIcon class="w-4 h-4" />
              This is how your article will appear to readers
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  List as ListIcon,
  ListOrdered as ListOrderedIcon,
  Link as LinkIcon,
  Image as ImageIcon,
  AlignLeft as AlignLeftIcon,
  AlignCenter as AlignCenterIcon,
  AlignRight as AlignRightIcon,
  Heading1 as Heading1Icon,
  Heading2 as Heading2Icon,
  Table as TableIcon,
  X as XIcon,
  Save as SaveIcon,
  Eye as EyeIcon,
  Info as InfoIcon,
  ChevronDown as ChevronDownIcon,
} from "lucide-vue-next";

// Sample categories
const categories = ref([
  { id: "tech", name: "Technology" },
  { id: "sports", name: "Sports" },
  { id: "politics", name: "Politics" },
  { id: "entertainment", name: "Entertainment" },
  { id: "science", name: "Science" },
  { id: "health", name: "Health" },
  { id: "business", name: "Business" },
  { id: "travel", name: "Travel" },
]);

// Article data
const article = ref({
  title: "",
  category: "",
  content: "",
  bannerImage: null,
});

// Banner image
const bannerInput = ref(null);
const bannerPreview = ref(null);

// Editor reference
const editorRef = ref(null);

// Editor menu items
const editorMenuItems = [
  { command: "bold", title: "Bold", icon: BoldIcon },
  { command: "italic", title: "Italic", icon: ItalicIcon },
  { command: "underline", title: "Underline", icon: UnderlineIcon },
  { command: "h1", title: "Heading 1", icon: Heading1Icon },
  { command: "h2", title: "Heading 2", icon: Heading2Icon },
  { command: "ul", title: "Bullet List", icon: ListIcon },
  { command: "ol", title: "Numbered List", icon: ListOrderedIcon },
  { command: "link", title: "Insert Link", icon: LinkIcon },
  { command: "alignLeft", title: "Align Left", icon: AlignLeftIcon },
  { command: "alignCenter", title: "Align Center", icon: AlignCenterIcon },
  { command: "alignRight", title: "Align Right", icon: AlignRightIcon },
];

// Get category name by id
const getCategoryName = (categoryId) => {
  const category = categories.value.find((c) => c.id === categoryId);
  return category ? category.name : "";
};

// Trigger banner upload
const triggerBannerUpload = () => {
  bannerInput.value.click();
};

// Handle banner upload
const handleBannerUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    bannerPreview.value = e.target.result;
    article.value.bannerImage = file;
  };
  reader.readAsDataURL(file);
};

// Remove banner
const removeBanner = (event) => {
  event.preventDefault();
  bannerPreview.value = null;
  article.value.bannerImage = null;
  bannerInput.value.value = "";
};

// Execute editor command
const executeCommand = (command) => {
  if (!editorRef.value) return;

  switch (command) {
    case "bold":
      document.execCommand("bold", false, null);
      break;
    case "italic":
      document.execCommand("italic", false, null);
      break;
    case "underline":
      document.execCommand("underline", false, null);
      break;
    case "h1":
      document.execCommand("formatBlock", false, "<h1>");
      break;
    case "h2":
      document.execCommand("formatBlock", false, "<h2>");
      break;
    case "ul":
      document.execCommand("insertUnorderedList", false, null);
      break;
    case "ol":
      document.execCommand("insertOrderedList", false, null);
      break;
    case "link":
      const url = prompt("Enter URL:");
      if (url) document.execCommand("createLink", false, url);
      break;
    case "alignLeft":
      document.execCommand("justifyLeft", false, null);
      break;
    case "alignCenter":
      document.execCommand("justifyCenter", false, null);
      break;
    case "alignRight":
      document.execCommand("justifyRight", false, null);
      break;
  }

  updateContent();
};

// Check if command is active
const isActive = (command) => {
  if (!document) return false;

  switch (command) {
    case "bold":
      return document.queryCommandState("bold");
    case "italic":
      return document.queryCommandState("italic");
    case "underline":
      return document.queryCommandState("underline");
    case "ul":
      return document.queryCommandState("insertUnorderedList");
    case "ol":
      return document.queryCommandState("insertOrderedList");
    case "alignLeft":
      return document.queryCommandState("justifyLeft");
    case "alignCenter":
      return document.queryCommandState("justifyCenter");
    case "alignRight":
      return document.queryCommandState("justifyRight");
    default:
      return false;
  }
};

// Insert image
const insertImage = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const img = `<img src="${e.target.result}" alt="Content image" class="max-w-full h-auto my-4 rounded-md" />`;
    document.execCommand("insertHTML", false, img);
    updateContent();
  };
  reader.readAsDataURL(file);
};

// Insert table
const insertTable = () => {
  const rows = prompt("Enter number of rows:", "3");
  const cols = prompt("Enter number of columns:", "3");

  if (!rows || !cols) return;

  let tableHTML =
    '<table class="border-collapse border border-gray-300 my-4 w-full">';

  // Create header row
  tableHTML += "<thead><tr>";
  for (let i = 0; i < cols; i++) {
    tableHTML +=
      '<th class="border border-gray-300 p-2 bg-gray-100">Header ' +
      (i + 1) +
      "</th>";
  }
  tableHTML += "</tr></thead><tbody>";

  // Create body rows
  for (let i = 0; i < rows - 1; i++) {
    tableHTML += "<tr>";
    for (let j = 0; j < cols; j++) {
      tableHTML +=
        '<td class="border border-gray-300 p-2">Cell ' +
        (i + 1) +
        "-" +
        (j + 1) +
        "</td>";
    }
    tableHTML += "</tr>";
  }

  tableHTML += "</tbody></table>";

  document.execCommand("insertHTML", false, tableHTML);
  updateContent();
};

// Update content
const updateContent = () => {
  if (editorRef.value) {
    article.value.content = editorRef.value.innerHTML;
  }
};

// Preview article
const previewArticle = () => {
  // In a real application, you might want to show a full-screen preview
  // For now, we'll just scroll to the preview section on mobile
  if (window.innerWidth < 1024) {
    const previewElement = document.querySelector(".lg\\:col-span-2");
    if (previewElement) {
      previewElement.scrollIntoView({ behavior: "smooth" });
    }
  }
};

// Save article
const saveArticle = () => {
  // Here you would typically send the article to your backend
  console.log("Saving article:", {
    ...article.value,
    bannerImage: article.value.bannerImage
      ? article.value.bannerImage.name
      : null,
  });

  // Show success message
  alert("Article saved successfully!");
};

// Initialize editor
onMounted(() => {
  if (editorRef.value) {
    editorRef.value.focus();
  }
});
</script>

<style>
/* Rich text editor styles */
[contenteditable] {
  outline: none;
}

[contenteditable] img {
  max-width: 100%;
  height: auto;
  border-radius: 0.375rem;
}

[contenteditable] a {
  color: #2563eb;
  text-decoration: underline;
}

[contenteditable] h1 {
  font-size: 1.875rem;
  font-weight: bold;
  margin: 1.5rem 0 1rem;
  line-height: 1.2;
}

[contenteditable] h2 {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 1.25rem 0 0.75rem;
  line-height: 1.3;
}

[contenteditable] p {
  margin: 0.75rem 0;
  line-height: 1.6;
}

[contenteditable] ul,
[contenteditable] ol {
  padding-left: 1.5rem;
  margin: 0.75rem 0;
}

[contenteditable] ul li {
  list-style-type: disc;
  margin: 0.375rem 0;
}

[contenteditable] ol li {
  list-style-type: decimal;
  margin: 0.375rem 0;
}

[contenteditable] blockquote {
  border-left: 4px solid #e5e7eb;
  padding-left: 1rem;
  margin: 1rem 0;
  color: #4b5563;
  font-style: italic;
}

/* Transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Sticky preview on desktop */
@media (min-width: 1024px) {
  .sticky {
    position: sticky;
    top: 1rem;
  }
}
</style>
