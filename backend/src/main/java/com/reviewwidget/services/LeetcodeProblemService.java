package com.reviewwidget.services;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Deque;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reviewwidget.models.Item;
import com.reviewwidget.models.LeetcodeProblem;
import com.reviewwidget.repositories.LeetcodeProblemRepositoryImpl;

@Service
public class LeetcodeProblemService {

    @Autowired
    private LeetcodeProblemRepositoryImpl leetcodeRepository;

    public LeetcodeProblem createLeetcodeProblem(LeetcodeProblem problem) {
        return leetcodeRepository.insert(problem);
    }

    public List<LeetcodeProblem> findAll() {
        List<Item> items = leetcodeRepository.findAll(Item.Type.LEETCODE);
        List<LeetcodeProblem> problems = items.stream().map(item -> (LeetcodeProblem) item).collect(Collectors.toList());
        return problems;
    }

    public List<LeetcodeProblem> findAllByCategory(String category) {
        List<Item> items = leetcodeRepository.findAll(Item.Type.LEETCODE);
        List<LeetcodeProblem> problems = items.stream()
                                            .map(item -> (LeetcodeProblem) item)
                                            .filter(leetcodeProblem -> leetcodeProblem.getCategories().contains(category))
                                            .collect(Collectors.toList());
        return problems;
    }

    public List<LeetcodeProblem> findAllByCategories(List<String> categories) {
        List<Item> items = leetcodeRepository.findAll(Item.Type.LEETCODE);
        List<LeetcodeProblem> problems = items.stream()
                                            .map(item -> (LeetcodeProblem) item)
                                            .filter(leetcodeProblem -> leetcodeProblem.getCategories().containsAll(categories))
                                            .collect(Collectors.toList());
        return problems;

    }

    public List<LeetcodeProblem> getDueProblems() {
        List<Item> items = leetcodeRepository.findAll(Item.Type.LEETCODE);
        List<LeetcodeProblem> problems = items.stream()
                                        .map(item -> (LeetcodeProblem) item)
                                        .filter(leetcodeProblem -> leetcodeProblem.isDue())
                                        .collect(Collectors.toList());
        return problems;
    }

    public Optional<LeetcodeProblem> findById(String id) {
        UUID uid = UUID.fromString(id);
        return leetcodeRepository.findById(uid);
    }

    public void deleteById(String id) {
        UUID uid = UUID.fromString(id);
        leetcodeRepository.deleteById(uid);
    }

    public void save(LeetcodeProblem updatedProblem) {
        leetcodeRepository.save(updatedProblem);
    }

    public void deleteAll() {
        leetcodeRepository.deleteAll();
    }

    // Shuffles a list of questions but keeps the priority the same
    public List<LeetcodeProblem> shuffleQuestionsInPriority(List<LeetcodeProblem> problems) {
        List<LeetcodeProblem> shuffledProblems = new ArrayList<>();
        if (problems.size() == 0) {
            return shuffledProblems;
        }

        // Return by highest priority
        Collections.sort(problems, Collections.reverseOrder((a, b) -> a.getPriority() - b.getPriority()));

        Deque<LeetcodeProblem> deque = new ArrayDeque<>(problems);
        int currentPriority = problems.get(0).getPriority();
        List<LeetcodeProblem> listWithCurrentPriority = new ArrayList<>();
        while (!deque.isEmpty()) {
            LeetcodeProblem problem = deque.poll();
            if (problem.getPriority() != currentPriority) {
                // Priority has changed
                // 1. update priority
                currentPriority = problem.getPriority();
                // 1.5 shuffle the current list
                Collections.shuffle(listWithCurrentPriority);
                // 2. add current list to answer list
                shuffledProblems.addAll(new ArrayList<>(listWithCurrentPriority));
                // 3. recreate temp list and add
                listWithCurrentPriority = new ArrayList<>();
            } 
            // Always add on the question to the temp list
            listWithCurrentPriority.add(problem);
        }

        // Remaining questions that haven't been added
        shuffledProblems.addAll(new ArrayList<>(listWithCurrentPriority));

        return shuffledProblems;
    }


}
