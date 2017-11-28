$(document).ready(function() {
  $("#add-button").click(function() {
    var newMatchPattern = $("#match-pattern-input").val();
    saveMatchPattern(newMatchPattern).then(function() {
      restoreMatchPatterns();
      browser.runtime.sendMessage("reloadMatchPatterns");

      // var matchPatterns = $("#match-patterns");
      // matchPatterns.append(match);
      // matchPatterns.append($("<br/>"));
    });
  });

  restoreMatchPatterns();
});

function restoreMatchPatterns() {
  getMatchPatterns().then(function(matchPatterns) {
    $("#match-patterns").text(matchPatterns);
  });
}

function getMatchPatterns() {
  var storageItem = browser.storage.sync.get("matchPatterns");
  return storageItem.then(function(res) {
    return res.matchPatterns || [];
  });
}

function saveMatchPattern(pattern) {
  return getMatchPatterns().then(function(matchPatterns) {
    matchPatterns.push(pattern);
    return browser.storage.sync.set({
      matchPatterns: matchPatterns
    });
  });
}