package com.reviewwidget.controllers;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

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

    // Create
    @PostMapping("leetcodeproblems")
    public Item createItem(@RequestBody LeetcodeProblem problem) {
        return leetcodeService.createLeetcodeProblem(problem);
    }

    // Read
    @GetMapping("leetcodeproblems")
    public List<LeetcodeProblem> getAllItems(@RequestParam Optional<String> category) {
        List<LeetcodeProblem> problems = null;
        if (category.isPresent()) {
            problems = leetcodeService.findAllByCategory(category.get());
        } else {
            problems = leetcodeService.findAll();;
        }

        // Return by highest priority
        Collections.sort(problems, Collections.reverseOrder((a, b) -> a.getPriority() - b.getPriority()));

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
