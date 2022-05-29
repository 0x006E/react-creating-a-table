export default function getFormData(ref) {
  let elements = ref.current.querySelectorAll("input");
  let data = {};
  for (var i = 0; i < elements.length; i++) {
    var el = elements[i];
    var val = el.value;
    if (!val) val = "";
    var fullName = el.getAttribute("name");
    if (!fullName) continue;
    var fullNameParts = fullName.split(".");
    var prefix = "";
    var stack = data;
    for (var k = 0; k < fullNameParts.length - 1; k++) {
      prefix = fullNameParts[k];
      if (!stack[prefix]) {
        stack[prefix] = {};
      }
      stack = stack[prefix];
    }
    prefix = fullNameParts[fullNameParts.length - 1];
    if (stack[prefix]) {
      var newVal = stack[prefix] + "," + val;
      stack[prefix] += newVal;
    } else {
      stack[prefix] = val;
    }
  }
  return data;
}
