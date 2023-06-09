package com.reviewwidget.controller;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.reviewwidget.models.Item;
import com.reviewwidget.models.LeetcodeProblem;
import com.reviewwidget.services.LeetcodeProblemService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class LeetcodeProblemController {

    @Autowired
    private LeetcodeProblemService leetcodeService;

    @GetMapping
    public String test() {
        return "Review Widget Backend";
    }

    // Create
    @PostMapping("leetcodeproblems")
    public Item createItem(@RequestBody LeetcodeProblem problem) {
        problem.setNextReviewDate();
        return leetcodeService.createLeetcodeProblem(problem);
    }

    // Read
    @PutMapping("leetcodeproblems")
    public List<LeetcodeProblem> getAllItems(@RequestBody Optional<List<String>> categories, @RequestParam Optional<Boolean> shuffle, @RequestParam Optional<Boolean> due) {
        List<LeetcodeProblem> problems = null;
        // TODO: Logic should be moved to service
        if (categories.isPresent()) {
            problems = leetcodeService.findAllByCategories(categories.get());
        } else {
            problems = leetcodeService.findAll();
        }

        if (due.isPresent() && due.get()) {
            problems = problems.stream().filter(p -> p.isDue()).collect(Collectors.toList());
        } 

        // Sort by priority
        Collections.sort(problems, Collections.reverseOrder((a, b) -> a.getPriority() - b.getPriority()));

        // if shuffle is required
        if (shuffle.isPresent() && shuffle.get()) {
            // problems = leetcodeService.shuffleQuestionsInPriority(problems);
        }

        return problems;
    }

    // Get all problem categories
    @GetMapping("leetcodeproblems/categories")
    public HashSet<String> getAllCategories() {
        List<LeetcodeProblem> problems = leetcodeService.findAll();
        HashSet<String> categories = new HashSet<>();

        for (int i = 0; i < problems.size(); i++) {
            List<String> pCategories = problems.get(i).getCategories();
            for (String cat : pCategories) {
                categories.add(cat);
            }
        }

        return categories;
    }

    @GetMapping("leetcodeproblems/{id}")
    public LeetcodeProblem getLeetcodeProblemById(@PathVariable String id) {
        Optional<LeetcodeProblem> problem = leetcodeService.findById(id);
        return problem.get();
    }

    // Update
    @PutMapping("leetcodeproblems/{id}")
    public LeetcodeProblem updateLeetcodeProblem(@PathVariable String id, @RequestBody LeetcodeProblem newProblem) {
        Optional<LeetcodeProblem> oldProblem = leetcodeService.findById(id);

        oldProblem.ifPresent(foundProblem -> {
            foundProblem.updateProblem(newProblem);
            leetcodeService.save(foundProblem);
        });
        oldProblem.orElseThrow(() -> new NoSuchElementException(id + " not found"));

        LeetcodeProblem updatedProblem = oldProblem.get();

        return updatedProblem;
    }

    // Delete
    @DeleteMapping("leetcodeproblems/{id}")
    public void deleteLeetcodeProblem(@PathVariable String id) {
        leetcodeService.deleteById(id);
    }

    // Delete All (for debugging and testing)
    @DeleteMapping("leetcodeproblems")
    public void deleteAllLeetcodeProblems() {
        leetcodeService.deleteAll();
    }
}
